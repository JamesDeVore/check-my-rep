import React, { useEffect, useState } from "react";
import Tabs from "./libs/Tabs";
import TripMap from "./libs/Map";
import Trips from "./libs/Trips";
import Bills from "./libs/Bills";
import Expenses from './libs/Expenses'

export default function MemberDetails(props) {
  const [expenses, setExpenses] = useState(null);
  const [trips, setTrips] = useState(null);
  const [bills, setBills] = useState(null);

  useEffect(() => {
    fetch(`/reps/memberDetails?memberID=${props.member.id}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        setBills(res.bills);
        setExpenses(res.expenses);
        setTrips(res.trips);
      });
  }, []);
  console.log(props.member,bills,trips,expenses)
  const name = `${props.member.first_name} ${props.member.last_name}`;
  return (
    <div className="w-full">
      <Tabs>
        <div label="Bills Sponsored">{bills ? <Bills bills={bills} /> : null}</div>
        <div label="Trips" className="h-auto">
          {trips ? (
            <div className="bg-gray-200 flex p-4 relative sm:p-8 text-black">
              <div className="flex flex-col w-full">
                <div>
                  <h2 className=" text-center text-2xl">
                    Recent Privately Funded Trips
                  </h2>
                  <p className="subtitle text-center text-sm font-bold">
                    * indicates a trip taken by {name}{" "}
                  </p>
                </div>
                <div className=" bg-white overflow-scroll rounded shadow-lg sm:mx-4 sm:p-6 sm:flex sm:flex-row text-sm text-xs">
                  <Trips trips={trips} />
                  <div className="bg-white p-6 rounded shadow-lg">
                    <TripMap trips={trips} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {/* <div label="Quarterly Expenses">
          {expenses? <Expenses expenses={expenses} /> : null}
        </div> */}
      </Tabs>
    </div>
  );
}
