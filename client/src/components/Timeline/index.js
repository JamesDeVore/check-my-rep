import React, { useEffect, useState } from "react";

import VoteItem from "./libs/VoteItem";
export default function VotingTimeline(props) {
  // console.log(props);
  let [memberVotes, setMemberVotes] = useState([]);
  useEffect(() => {
    fetch(`/reps/memberVotes?memberID=${props.member.id}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res.results);
        const getSingleVote = async voteObj => {
          return fetch("/reps/getVotes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: voteObj.vote_uri })
          })
            .then(data => data.json())
            .then(data => {
              if (data.status === "OK") {
                return { ...voteObj, voteObj: data.results.votes };
              } else {
                return voteObj;
              }
            });
        };
        Promise.all(
          res.results[0].votes.slice(0,10).map(voteObj => getSingleVote(voteObj))
        ).then(vals => setMemberVotes(vals));
      });
  }, []);

  const renderVotes = () => {
    if(memberVotes.length > 10){
      memberVotes = memberVotes.slice(0,10);
    }
    let votes = memberVotes.map((vote, index) => {
      return <VoteItem voteObj={vote} key={index} />;
    });
    return <div className="text-white grid grid-cols-4 gap-6 col-span-2">{votes}</div>;
  };
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-2">
        <h1 className="text-2xl text-white font-bold text-center border-gray-900 border-b-2 mx-12 mb-4">Recent Voting Record</h1>
      </div>
      {renderVotes()}
    </div>
  );
}
