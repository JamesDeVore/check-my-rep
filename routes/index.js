var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var fs = require("fs");
var path = require("path");

const _membersAPIWRAPPER = async (house = "house", num = "116") => {
  let ProPubResponse = await fetch(
    `https://api.propublica.org/congress/v1/${num}/${house}/members.json`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY
      }
    }
  )
    .then(result => result.json())
    .catch(result => (result.status = "ERROR"));
  return ProPubResponse;
};

const _individualMemberAPIWrapper = async id => {
  let ProPubResponse = await fetch(
    `https://api.propublica.org/congress/v1/members/${id}.json`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY
      }
    }
  )
    .then(result => result.json())
    .catch(result => (result.status = "ERROR"));
  return ProPubResponse;
};

const _memberRecentVotesWrapper = async id => {
  let ProPubResponse = await fetch(
    `https://api.propublica.org/congress/v1/members/${id}/votes.json`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY
      }
    }
  )
    .then(result => result.json())
    .catch(result => (result.status = "ERROR"));
  return ProPubResponse;
};

const getQuarter = d => {
  d = d || new Date();
  var m = Math.floor(d.getMonth() / 3) + 1;
  return m > 4 ? m - 4 : m;
};
const _getLastYearExpenses = async id => {
  let date = new Date();
  let expenses = [];
  let promises = [];
  for (let i = 1; i < 5; i++) {
    //  let ProPubResponse = await fetch(
    //    `https://api.propublica.org/congress/v1/members/${id}/office_expenses/${date.getFullYear() - 1}/${i}.json`,
    //    {
    //      method: "GET",
    //      headers: {
    //        "X-API-KEY": process.env.API_KEY
    //      }
    //    }
    //  )
    //    .then(result => result.json())
    //    .catch(result => (result.status = "ERROR"))
    //   //  console.log(ProPubResponse);
    //    expenses.concat(ProPubResponse)
    promises.push(
      fetch(
        `https://api.propublica.org/congress/v1/members/${id}/office_expenses/${date.getFullYear() -
          1}/${i}.json`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": process.env.API_KEY
          }
        }
      )
        .then(result => result.json())
        .catch(result => (result.status = "ERROR"))
    );
  }

  let resolved = await Promise.all(promises).then(vals => {
    console.log(vals);
    return vals;
  });
  // console.log(expenses)
  return { results: resolved };
};

const _getPrivateTripsWrapper = async id => {
  let date = new Date();

  let ProPubResponse = await fetch(
    `https://api.propublica.org/congress/v1/members/${id}/private-trips.json`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY
      }
    }
  )
    .then(result => result.json())
    .catch(result => (result.status = "ERROR"));
  return ProPubResponse;
};
const _getRecentBillsWrapper = async id => {
  let date = new Date();

  let ProPubResponse = await fetch(
    `https://api.propublica.org/congress/v1/members/${id}/bills/introduced.json`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY
      }
    }
  )
    .then(result => result.json())
    .catch(result => (result.status = "ERROR"));
  return ProPubResponse;
};

const _generalAPIWrapper = async url => {
  return fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.API_KEY
    }
  })
    .then(result => result.json())
    .catch(result => (result.status = "ERROR"));
};

/* GET home page. */
router.get("/all", async function(req, res, next) {
  //get a list of ALL members of house or congress
  //actually probably don't need this now that I have the filter

  let houseResponse = await _membersAPIWRAPPER("house", "116");
  let senateResponse = await _membersAPIWRAPPER("senate", "116");

  if (houseResponse.status === "OK" && senateResponse.status === "OK") {
    //successful query
    let finalResponse = { status: "OK", copyright: senateResponse.copyright };
    finalResponse.results = houseResponse.results[0].members.concat(
      senateResponse.results[0].members
    );
    res.send(finalResponse);
  } else {
    // something went wrong
    res.send([houseResponse, senateResponse]);
  }
});

router.get("/filterBy", async (req, res, next) => {
  let {
    first_name,
    last_name,
    gender,
    party,
    in_office,
    state,
    next_election
  } = req.query;

  let AllMembers = require("./devResponses/all.json");

  //time to filter all the members down

  let filteredMembers = AllMembers.results;
  for (key in req.query) {
    filteredMembers = filteredMembers.filter(member => {
      if (key === "first_name" || key === "last_name") {
        return member[key]
          .toString()
          .toUpperCase()
          .includes(req.query[key].toString().toUpperCase());
      }
      return (
        member[key].toString().toUpperCase() ===
        req.query[key].toString().toUpperCase()
      );
    });
  }

  let returnData = {
    count: filteredMembers.length,
    results: filteredMembers,
    success: true
  };
  res.send(returnData);
});
router.get("/byID", async (req, res, next) => {
  let returnData = {
    success: false,
    data: null,
    message: ""
  };
  let { memberID } = req.query;
  if (!memberID) {
    returnData.message = "Invalid or missing ID";
    return res.send(returnData);
  }
  let thisMember = await _individualMemberAPIWrapper(memberID);
  // fs.writeFileSync(path.resolve(__dirname,"devResponses/single.json"), JSON.stringify(thisMember))
  // let thisMember = require("./devResponses/single.json");
  res.send(thisMember);
});
router.get("/memberVotes", async (req, res, next) => {
  let returnData = {
    success: false,
    data: null,
    message: ""
  };
  let { memberID } = req.query;
  if (!memberID) {
    returnData.message = "Invalid or missing ID";
    return res.send(returnData);
  }
  let thisMember = await _memberRecentVotesWrapper(memberID);
  // let thisMember = require("./devResponses/votes.json");
  // fs.writeFileSync(path.resolve(__dirname,"devResponses/votes.json"), JSON.stringify(thisMember));

  res.send(thisMember);
});
router.get("/memberDetails", async (req, res, next) => {
  let { memberID } = req.query;
  if (!memberID) {
    returnData.message = "Invalid or missing ID";
    return res.send(returnData);
  }
  let expenses = await _getLastYearExpenses(memberID);
  let trips = await _getPrivateTripsWrapper(memberID);
  let bills = await _getRecentBillsWrapper(memberID);
  // for convenience
  // console.log(expenses);
  // fs.writeFileSync(
  //   path.resolve(__dirname, "devResponses/details.json"),
  //   JSON.stringify({ expenses, trips, bills })
  // );
  // res.send(require("./devResponses/details.json"));
  res.send({ expenses, trips, bills });
});
router.post("/getVotes", async (req, res, next) => {
  let { url } = req.body;
  console.log(url);
  let thisResponse = await _generalAPIWrapper(url);
  let file = url.split("/");
  let fileName = file[file.length -1];
  // fs.writeFileSync(path.resolve(__dirname,"devResponses","voteItems",fileName),JSON.stringify(thisResponse))
  // console.log(thisResponse);

  res.send(thisResponse);
  // res.send(
  //   require(path.resolve(__dirname, "devResponses", "voteItems", fileName))
  // );
});

module.exports = router;
