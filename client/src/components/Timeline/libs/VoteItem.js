import React from "react";
import moment from 'moment'
export default function VoteItem(props) {
  let { voteObj } = props;
  let vote = voteObj.voteObj.vote; //awful
  //going to try and shape the data to make it easier on myself
  //red : #e53e3e rgb(229,62,62)
  // blue: #3182ce rgb(49,130,206)
  let styles = {
    r: {
      y: 80 - (vote.republican.yes / (vote.republican.yes + vote.republican.no) *50),
      n: 80 - (vote.republican.no / (vote.republican.yes + vote.republican.no) *50)
    },
    d: {
      y: 80 - (vote.democratic.yes / (vote.democratic.yes + vote.democratic.no) *50),
      n: 80 - (vote.democratic.no / (vote.democratic.yes + vote.democratic.no) *50)
    }
  };
  let totalVotes = voteObj.total.yes + voteObj.total.no;
  return (
    <div className="grid shadow-lg rounded p-2 bg-white grid-cols-2 relative border col-span-2">
      <div className="col-span-2">
        <div className="flex text-black justify-between border-gray-700 border-b-2">
          <p>{voteObj.bill.number}</p>
          <p>{moment(voteObj.date).format("MMM DD, YYYY")}</p>
        </div>
        <h1 className="text-center text-lg text-black font-bold">
          {vote.bill.short_title}
        </h1>
        <h3 className="subtitle text-center text-lg text-black">
          <span className="italic">Question: </span>
          {voteObj.question}
        </h3>
      </div>
      <div className="col-span-2 grid grid-cols-2 text-black">
        <div className="col-span-1 text-center border font-bold text-xl">
          Democrats
        </div>
        <div className="col-span-1 text-center border font-bold text-xl">
          Republicans
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-2 relative">
        <div className="col-span-1 font-bold grid grid-rows-2 text-center">
          <div
            style={{ backgroundColor: `hsl(209,61.6%,${styles.d.y}%)` }}
            className="border h-32 px-6"
          >
            <h1 className="border-b-2 text-2xl underline w-full">Yes</h1>
            <h1 className="text-xl">Total Votes: {vote.democratic.yes}</h1>
            <h1 className="">
              Overall:{" "}
              {Math.round((vote.democratic.yes / totalVotes) * 10000) / 100}%
            </h1>
          </div>
          <div
            style={{ backgroundColor: `hsl(209,61.6%,${styles.d.n}%)` }}
            className="border h-32 px-6"
          >
            <h1 className="border-b-2 text-2xl underline w-full">No</h1>
            <h1 className="text-xl">Total Votes: {vote.democratic.no}</h1>
            <h1 className="">
              Overall:{" "}
              {Math.round((vote.democratic.no / totalVotes) * 10000) / 100}%
            </h1>
          </div>
        </div>
        <div className="col-span-1 font-bold grid grid-rows-2 text-center">
          <div
            style={{ backgroundColor: `hsl(0,86.3%,${styles.r.y}%)` }}
            className="border h-32 px-6"
          >
            <h1 className="border-b-2 text-2xl underline w-full">Yes</h1>
            <h1 className="text-xl">Total Votes: {vote.republican.yes}</h1>
            <h1 className="">
              Overall:{" "}
              {Math.round((vote.republican.yes / totalVotes) * 10000) / 100}%
            </h1>
          </div>
          <div
            style={{ backgroundColor: `hsl(0,86.3%,${styles.r.n}%)` }}
            className="border h-32 px-6"
          >
            <h1 className="border-b-2 text-2xl underline w-full">No</h1>
            <h1 className="text-xl">Total Votes: {vote.republican.no}</h1>
            <h1 className="">
              Overall:{" "}
              {Math.round((vote.republican.no / totalVotes) * 10000) / 100}%
            </h1>
          </div>
        </div>
        <div
          style={{ left: "50%", top: "50%" }}
          className="-ml-16 -mt-16 absolute bg-white border-8 border-gray-500 flex flex-col h-32 items-center justify-center rounded-full text-black w-32"
        >
          <h1 className="text-lg font-hairline text-center ">My Vote:</h1>
          <h2 className="text-center text-2xl font-bold underline">
            {voteObj.position}
          </h2>
        </div>
      </div>
    </div>
  );
}
