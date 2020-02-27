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
export default function Stats(props) {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [memberObj, setMemberObj] = useState(null);

  useEffect(() => {
    fetch(`/reps/byID?memberID=${id}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        setMemberObj(res.results[0]);
      });
  }, []);
  return (
    <>
      {/* <LoadingScreen loading={loading} /> */}
      <div className="text-white border StatsGrid gap-2   m-2">
        <div className=" border h-full p-2 bg-blue-500 sm:col-span-1 sm:row-span-1">
          {memberObj ? <BasicInfo member={memberObj} /> : null}
        </div>
        <div className="p-4 border w-full bg-gray-600 sm:col-span-3 row-span-1">
          {memberObj ? <InitialStats member={memberObj} /> : null}
        </div>
        <div className="sm:row-span-1 sm:col-span-4">
          {memberObj ? <MemberDetails member={memberObj} /> : null}
        </div>
        <div className="w-full bg-red-600 sm:row-span-1 sm:col-span-4">
          <h1>Voting timeline</h1>
        </div>
      </div>
    </>
  );
}
