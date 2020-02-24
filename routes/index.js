var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");

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

const _individualMemberAPIWrapper = async (id) => {
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
}

const _memberRecentVotesWrapper = async (id) => {
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
}


/* GET home page. */
router.get("/all", async function(req, res, next) {
  //get a list of ALL members of house or congress
  //actually probably don't need this now that I have the filter

  let houseResponse = await _membersAPIWRAPPER("house", "116");
  let senateResponse = await _membersAPIWRAPPER("senate", "116");

  if (houseResponse.status === "OK" && senateResponse.status === "OK") {
    //successful query
    let finalResponse = {status:"OK",copyright:senateResponse.copyright};
    finalResponse.results = houseResponse.results[0].members.concat(senateResponse.results[0].members)
    res.send(finalResponse);
  } else {
    // something went wrong
    res.send([houseResponse, senateResponse]);
  }
});

router.get('/filterBy', async (req,res,next) => {

  let {first_name, last_name, gender, party, in_office,state,next_election} = req.query;

  let AllMembers = require("./devResponses/all.json");

  //time to filter all the members down
  
  let filteredMembers = AllMembers.results;
  for(key in req.query){
    filteredMembers = filteredMembers.filter(member => {
      if(key === "first_name" || key === "last_name"){
        return member[key].toString().toUpperCase().includes(req.query[key].toString().toUpperCase())
      }
      return member[key].toString().toUpperCase() === req.query[key].toString().toUpperCase()
    })
  }

  let returnData = {
    count:filteredMembers.length,
    results:filteredMembers,
    success:true
  }
  res.send(returnData)

})
router.get('/member', async (req,res,next) => {
  let returnData = {
    success:false,
    data:null,
    message:""
  }
  let {memberID} = req.query;
  if(!memberID){
    returnData.message = "Invalid or missing ID";
    return res.send(returnData)
  }
  let thisMember = await _individualMemberAPIWrapper(memberID);
  res.send(thisMember)
})
router.get('/memberVotes', async (req,res,next) => {
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
    res.send(thisMember);
})

module.exports = router;
