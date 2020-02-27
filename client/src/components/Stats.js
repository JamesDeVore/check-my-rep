import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useParams
} from "react-router-dom";

import BasicInfo from './BasicInfo'
import InitialStats from './InitialStats'
import LoadingScreen from './LoadingScreen'
import MemberDetails from './memberInfo/MemberDetails'
export default function Stats(props) {
  let {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [memberObj, setMemberObj] = useState(null)

  useEffect(() => {
    fetch(`/reps/byID?memberID=${id}`)
    .then(res=> res.json())
    .then(res => {
      // console.log(res)
      setMemberObj(res.results[0])
    })
  },[])
  return (
    <>
    <LoadingScreen loading={loading} />
    <div className="text-white border flex  flex-col md:flex-row">
      <div className=" border p-2 bg-blue-500 md:w-1/4 h-1/2 w-full">
        {memberObj? <BasicInfo member={memberObj} />:null}
      </div>
      
      <div className="text-white border w-full flex flex-col h-screen items-center">
        <div className="p-4 border w-full bg-gray-600">
          {memberObj? <InitialStats member={memberObj} />: null}
        </div>
        <div className=" w-full">
          {memberObj? <MemberDetails member={memberObj} /> : null}
        </div>
        <div className="w-full bg-red-600 h-full">
          <h1>Voting timeline</h1>
        </div>
      </div>
    </div>
    </>
  );
}
