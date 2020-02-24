import React, { useState, useEffect } from "react";

export default function GetStarted() {
  let [members, setMembers] = useState([]);
  let [cachedMembers, setCachedMembers] = useState([])
  let [memberInput, setMemberInput] = useState("");
  let [selectedState, setSelectedState] = useState("");
  let [states, setStates] = useState([]);
  let [validated, setValidated] = useState(false)
  
  useEffect(() => {
    fetch("/reps/filterby")
      .then(res => res.json())
      .then(res => {
        setMembers(res.results)
        setCachedMembers(res.results);
        let stateSet = new Set();
        members.forEach(member => stateSet.add(member.state));
        let stateArray = Array.from(stateSet);
        setStates(stateArray.sort());
      });
      
  }, []);

  useEffect(() => {
    let stateSet = new Set();
    members.forEach(member => stateSet.add(member.state));
    let stateArray = Array.from(stateSet);
    setStates(stateArray.sort());
  }, [cachedMembers]);

  const handleStateSelect = e => {
    setMemberInput("");
    setSelectedState(e.target.value);
    if(e.target.value !== ""){
      let filteredMembers = cachedMembers.filter(memObj => memObj.state === e.target.value)
      setMembers(filteredMembers)
    } else {
      setMembers(cachedMembers)
    }
  }

  const handleMemberInput = e => {
    setMemberInput(e.target.value);
    handleCorrectSelection(e.target.value)
  }

  const handleCorrectSelection = (input) => {
    //need to make sure I can get the ID for the name they typed in
     let foundMember = cachedMembers.find(membs => `${membs.first_name.toUpperCase()} ${membs.last_name.toUpperCase()}` === input.toUpperCase());
     if(foundMember){
       console.log(foundMember)
       setValidated(true);
     } else {
       setValidated(false)
     }
  
  }

  let dataList = members.map((memberObj,index) => (
      <option
        value={`${memberObj.first_name} ${memberObj.last_name}`}
        key={`${memberObj.id}_${memberObj.last_name}${index}`}
        data-id={memberObj.id}
      >
        {`${memberObj.party} - ${memberObj.state}${ memberObj.district? `, District ${memberObj.district}`:""}`}
      </option>
  ));
  let stateOptions = states.map(state => (
    <option key={state} value={state}>{state}</option>
  ));

  // console.log(members);
  return (
    <div className="bg-blue-500 flex p-4 flex-col items-center">
      <h2 className="font-bold">Get Started:</h2>
      <div className="text-black mt-4 mb-4  flex flex-col items-center">
        <div className="flex flex-col w-full items-center mx-auto">
          <h3>Search By Name</h3>
          <input
            className="m-2 p-4"
            type="text"
            placeholder="Search by name"
            list="members"
            value={memberInput}
            onChange={handleMemberInput}
          />
          <datalist id="members">{dataList}</datalist>
        </div>
        <div className="flex flex-col w-full items-center mx-auto">
          <h3>Or Filter by State</h3>
          <select onChange={handleStateSelect} value={selectedState} className="m-2 p-4 w-full" type="text" placeholder="or state">
            <option value="">All</option>
            {stateOptions}
          </select>
        </div>
      </div>
    </div>
  );
}
