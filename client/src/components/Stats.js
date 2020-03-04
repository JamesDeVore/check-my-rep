import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useParams
} from "react-router-dom";

import BasicInfo from "./BasicInfo";
import InitialStats from "./InitialStats";
import LoadingScreen from "./LoadingScreen";
import MemberDetails from "./memberInfo/MemberDetails";
import VotingTimeline from './Timeline/index';
export default function Stats(props) {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [memberObj, setMemberObj] = useState(null);

  useEffect(() => {
    fetch(`/reps/byID?memberID=${id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setMemberObj(res.results[0]);
      });
  }, [id]);
  return (
    <>
      {/* <LoadingScreen loading={loading} /> */}
      <div className="text-gray-900 border bg-gray-200 StatsGrid gap-2  p-4">
        <div className="bg-blue-500 border col-span-4 h-full p-2 sm:col-span-1 sm:row-span-1">
          {memberObj ? <BasicInfo member={memberObj} /> : null}
        </div>
        <div className="sm:p-4 p-2 border w-full bg-gray-600 col-span-4 sm:col-span-3 row-span-1">
          {memberObj ? <InitialStats member={memberObj} /> : null}
        </div>
        <div className="sm:row-span-1 sm:col-span-4 col-span-4">
          {memberObj ? <MemberDetails member={memberObj} /> : null}
        </div>
        <div className="bg-gray-600 col-span-4 px-4 sm:col-span-4 sm:row-span-1 w-full">
          {memberObj ? <VotingTimeline member={memberObj} /> : null}
        </div>
      </div>
    </>
  );
}
