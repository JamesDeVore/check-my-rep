import React, { useState } from "react";
import moment from "moment";
export default function Bills(props) {
  console.log(props);
  let { bills } = props.bills.results[0];

  const [selectedBill, setSelectedBill] = useState(0);

  //for ease
  let bill = bills[selectedBill];
  return (
    <div className="grid grid-cols-6 grid-rows-1">
      <div className="col-span-1 col-start-1 flex flex-col bg-gray-100">
        {bills.map((bill, index) => {
          let selected = index === selectedBill;

          let selectorClass =
            "bg-gray-100 border border-gray-400 cursor-pointer duration-200 hover:bg-gray-500 px-2 py-1 rounded text-gray-900 transition-colors";
          if (selected) {
            selectorClass += " bg-gray-400";
          }
          return (
            <div
              className={selectorClass}
              onClick={() => setSelectedBill(index)}
            >
              {bill.number}
            </div>
          );
        })}
      </div>
      <div className=" text-black col-span-5 col-start-2 bg-gray-700 p-10">
        <div className="mx-auto bg-white p-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="font-hairline text-gray-600 text-center">
                {bill.committees}
              </h2>
              <h2 className="font-hairline text-gray-600 text-center">
                {bill.primary_subject}
              </h2>
            </div>
            <p className="font-hairline text-gray-600 text-center italic">
              {moment(bill.introduced_date).format("MMM DD,YYYY")}
            </p>
          </div>
          <h1 className="text-2xl font-bold text-center">{bill.short_title}</h1>
          <hr />

          <p className="p-4 text-sm">{bill.summary}</p>
          <a
            className="font-bold text-blue-500 underline text-center"
            href={bill.govtrack_url}
          >
            Link to bill
          </a>
        </div>
      </div>
    </div>
  );
}

/*=====================================================
congress: "116"
bill_id: "hres247-116"
bill_type: "hres"
number: "H.RES.247"
bill_uri: "https://api.propublica.org/congress/v1/116/bills/hres247.json"
title: "Recognizing the 50th anniversary of The Dental College of Georgia at Augusta University."
short_title: "Recognizing the 50th anniversary of The Dental College of Georgia at Augusta University."
sponsor_title: "Rep."
sponsor_id: "A000372"
sponsor_name: "Rick Allen"
sponsor_state: "GA"
sponsor_party: "R"
sponsor_uri: "https://api.propublica.org/congress/v1/members/A000372.json"
gpo_pdf_uri: null
congressdotgov_url: "https://www.congress.gov/bill/116th-congress/house-resolution/247"
govtrack_url: "https://www.govtrack.us/congress/bills/116/hres247"
introduced_date: "2019-03-21"
active: false
last_vote: null
house_passage: null
senate_passage: null
enacted: null
vetoed: null
cosponsors: 2
cosponsors_by_party: {D: 1, R: 1}
committees: "House Education and Labor Committee"
primary_subject: "Health"
summary: "This resolution recognizes the 50th anniversary of The Dental College of Georgia at Augusta University and its distinguished alumni."
summary_short: "This resolution recognizes the 50th anniversary of The Dental College of Georgia at Augusta University and its distinguished alumni."
latest_major_action_date: "2019-03-21"
latest_major_action: "Referred
=====================================================*/
