import React, { useState, useEffect } from "react";
import { Link, Prompt, Redirect } from "react-router-dom";
export default function NavSearch(props) {
  let [members, setMembers] = useState([]);
  let [cachedMembers, setCachedMembers] = useState([]);
  let [memberInput, setMemberInput] = useState("");
  let [selectedState, setSelectedState] = useState("");
  let [states, setStates] = useState([]);
  let [validated, setValidated] = useState(false);
  let [toNext, setToNext] = useState(false);
  let [member, setMember] = useState(null);

  useEffect(() => {
    fetch("/reps/filterby")
      .then(res => res.json())
      .then(res => {
        setMembers(res.results);
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
    if (e.target.value !== "") {
      let filteredMembers = cachedMembers.filter(
        memObj => memObj.state === e.target.value
      );
      setMembers(filteredMembers);
    } else {
      setMembers(cachedMembers);
    }
  };

  const handleMemberInput = e => {
    setMemberInput(e.target.value);
    handleCorrectSelection(e.target.value);
  };

  const handleCorrectSelection = input => {
    //need to make sure I can get the ID for the name they typed in
    let foundMember = cachedMembers.find(
      membs =>
        `${membs.first_name.toUpperCase()} ${membs.last_name.toUpperCase()}` ===
        input.toUpperCase()
    );
    if (foundMember) {
      console.log(foundMember);
      setMember(foundMember);
      setValidated(true);
    } else {
      setValidated(false);
    }
  };
  const handleGetStarted = e => {
    if (validated) {
      setToNext(true);
    }
  };

  let dataList = members.map((memberObj, index) => (
    <option
      value={`${memberObj.first_name} ${memberObj.last_name}`}
      key={`${memberObj.id}_${memberObj.last_name}${index}`}
      data-id={memberObj.id}
    >
      {`${memberObj.party} - ${memberObj.state}${
        memberObj.district ? `, District ${memberObj.district}` : ""
      }`}
    </option>
  ));
  let stateOptions = states.map(state => (
    <option key={state} value={state}>
      {state}
    </option>
  ));

  let buttonClass =
    "ml-4 bg-green-800 hover:bg-green-700 text-gray-200 font-semibold py-2 px-4 border border-green-400 rounded shadow";
  if (!validated) {
    buttonClass += " cursor-not-allowed opacity-50";
  }
  
  if (toNext) {
    
    
  } else {
    return (
      <>
      {toNext? <Redirect to={`/stats/${member.id}`} /> : null}
      <div className="flex flex-row items-center">

        <div className="text-black flex flex-row items-center justify-center flex-wrap">
          <div className="flex flex-col  items-center mx-auto">
            <input
              className="p-2 mx-2 rounded"
              type="text"
              placeholder="Search by name"
              list="members"
              value={memberInput}
              onChange={handleMemberInput}
            />
            <datalist id="members">{dataList}</datalist>
          </div>
          <div className="flex flex-col  items-center mx-auto">
            <select
              onChange={handleStateSelect}
              value={selectedState}
              className="p-2 mx-2 w-full rounded"
              type="text"
              placeholder="or state"
            >
              <option value="">All</option>
              {stateOptions}
            </select>
          </div>
          <button className={buttonClass} onClick={handleGetStarted}>
            Search
          </button>
        </div>
      </div>
      </>
    );
  }
}
