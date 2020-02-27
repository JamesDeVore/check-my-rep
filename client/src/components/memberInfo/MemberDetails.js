import React, { useEffect, useState } from "react";
import Tabs from "./libs/Tabs";
import TripMap from "./libs/Map";
import Trips from "./libs/Trips";

export default function MemberDetails(props) {
  const [expenses, setExpenses] = useState(null);
  const [trips, setTrips] = useState(null);
  const [bills, setBills] = useState(null);

  useEffect(() => {
    fetch(`/reps/memberDetails?memberID=${props.member.id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setBills(res.bills);
        setExpenses(res.expenses);
        setTrips(res.trips);
      });
  }, []);

  return (
    <div className="w-full">
      <Tabs>
        <div label="Bills">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Trips" className="h-auto">
          <div className="flex relative p-8 bg-green-500">
            <div className="flex flex-col w-full">
              <div>
                <h2 className="text-2xl text-center">Recently Funded Staff Trips</h2>
                <p className="subtitle text-sm text-center">
                  These are trips funded by the member's office
                </p>
              </div>
              <div className="flex flex-row justify-between">
              <Trips trips={trips} />
              <TripMap trips={trips} />
              </div>
            </div>
          </div>
        </div>
        <div label="Expenses">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>
    </div>
  );
}