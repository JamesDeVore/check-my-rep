import React, { useState, useEffect } from "react";
import moment from "moment";
import PieChart from "./sub/PieChart";

export default function InitialStats(props) {
  let { member } = props;
  // member.roles = member.roles.concat(member.roles)

  return (
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {member.roles.map((role, index) => {
          let partyColors = { main: "gray-700" };
          console.log(role)
          switch (role.party) {
            case "R":
              partyColors.main = "#e53e3e"; //bg-red-600
              partyColors.opposing = "#3182ce";
              break;
            case "D":
              partyColors.main = "#3182ce"; //bg-blue-600
              partyColors.opposing = "#e53e3e";
              break;
          }
          return (
            <div
              key={index}
              className="border col-span-1 m-2 flex-1 flex flex-col rounded text-gray-800 bg-white px-2"
            >
              <div className="border-4 font-bold text-center">
                <h2>
                  Congress # {role.congress} {role.short_title} {role.state}
                </h2>
                <h2 className="font-thin">
                  {moment(role.start_date).format("MMM/YYYY")} -{" "}
                  {moment(role.end_date).format("MMM/YYYY")}
                </h2>
                <h2></h2>
              </div>
              <div className="border-b-2 border-gray-600 text-sm flex flex-row justify-evenly p-2">
                <div>
                  <p>Total votes: {role.total_votes}</p>
                  <p style={{color:partyColors.main}}>Votes with party: {role.votes_with_party_pct}%</p>
                  <p style={{color:partyColors.opposing}}>Votes against party {role.votes_against_party_pct}%</p>
                  <p style={{color:"#d69e2e"}}>Missed votes: {role.missed_votes_pct}%</p>

                </div>
                <PieChart
                  data={[
                    role.votes_against_party_pct,
                    role.votes_with_party_pct,
                    role.missed_votes_pct
                  ]}
                  htmlId={`p${index}`}
                  colors={partyColors}
                />
              </div>
              <div>
                {role.committees
                  .concat(role.subcommittees)
                  .map((com, index) => (
                    <div key={`com${index}`}>
                      <p className="text-xs">
                        <span className="font-bold">
                          {com.title ? com.title : "Member"}
                        </span>{" "}
                        - {com.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
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
