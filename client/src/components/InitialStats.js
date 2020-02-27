import React, {useState, useEffect} from 'react'
import moment from 'moment'
import PieChart from './sub/PieChart'

export default function InitialStats(props) {
  let {member} = props

  return (
    <div className="flex flex-row">
        <div className="flex lg:flex-row w-full flex-col border">
          {member.roles.map((role, index) => {
              let partyColors = { main: "gray-700" };
              switch (role.party) {
                case "R":
                  partyColors.main = "#e53e3e"; //bg-red-600
                  partyColors.opposing = "#3182ce";
                case "D":
                  partyColors.main = "#3182ce"; //bg-blue-600
                  partyColors.opposing = "#e53e3e";
              }
            return(
            <div
              key={index}
              className="border m-2 flex-1 flex flex-col rounded text-gray-800 bg-white px-2"
            >
              <div className="border-4 font-bold text-center">
                <h2>
                  Congress # {role.congress} {role.short_title} {role.state}
                </h2>
                <h2 className="font-thin">
                  {moment(role.start_date).format("MMM/YYYY")} -{" "}
                  {moment(role.end).format("MMM/YYYY")}
                </h2>
                <h2></h2>
              </div>
              <div className="border-b-2 border-gray-600 text-sm flex flex-row justify-evenly p-2">
                <div>
                <p>Total votes: {role.total_votes}</p>
                <p>Votes with party: {role.votes_with_party_pct}%</p>
                <p>Votes against party {role.votes_against_party_pct}%</p>
                </div>
                <PieChart data={[role.votes_with_party_pct,role.votes_against_party_pct, role.missed_votes_pct]} htmlId={`p${index}`} colors={partyColors} />
              </div>
              <div className="border-b-2 border-gray-600 text-sm flex justify-between">
                <p>Bills Sponsored: {role.bills_sponsored}</p>
                <p>Bills Co-Sponsored: {role.bills_cosponsored}</p>
              </div>
              <div>
                {role.committees
                  .concat(role.subcommittees)
                  .map((com, index) => (
                    <div key={`com${index}`}>
                      <p className="text-xs">
                        <span className="font-bold">{com.title ? com.title:"Member"}</span> - {com.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )})}
        </div>
    </div>
  );
}

/*=====================================================
name: "Committee on Education and Labor"
code: "HSED"
api_uri: "https://api.propublica.org/congress/v1/116/house/committees/HSED.json"
side: "minority"
title: "Member"
rank_in_party: 9
begin_date: "2019-01-23"
end_date: "2021-01-03"
=====================================================*/