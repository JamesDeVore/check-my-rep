import React from "react";
import moment from 'moment'


export default function Trips(props) {
  console.log(props);
  const renderTableRows = () => {
    let rows = []
    if(props.trips){
      let cellClass = " border-l border-gray-900 px-2";
      
       rows = props.trips.results.map((trip, index) => {
         let rowClass = "bg-red-200"
         if(trip.is_member){
          rowClass += " font-bold"
         }
         if(index % 2 === 0){
          rowClass += " bg-indigo-200"
         }
         return (
           <tr className={rowClass}>
             <td className={cellClass}>{trip.destination}</td>
             <td className={cellClass + " w-16"}>
               {moment(trip.departure_date).format("MM/DD/YY")}
             </td>
             <td className={cellClass}>{trip.sponsor}</td>

             <td className={cellClass}>
               <a className="text-blue-600 underline" target="_blank" href={trip.pdf_url}>
                 Link
               </a>
             </td>
           </tr>
         );});
  }
    
    return rows;
  }
  let headerClass = "border-gray-900 border-l px-8";
  return (
    <div className="flex flex-col items-center">
      <table className="bg-gray-200 border-collapse text-gray-900 text-xs">
        <thead>
          <tr className="">
            <th className={headerClass}>Destination</th>
            <th className={headerClass}>Date</th>
            <th className={headerClass}>Sponsor</th>
            <th className={headerClass}>PDF</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
}

/*=====================================================
filing_type: "Original"
traveler: "Lauren Hodge"
is_member: 0
congress: 116
departure_date: "2019-08-10"
return_date: "2019-08-17"
chamber: "House"
destination: "Boise, ID"
sponsor: "Idaho Farm Bureau Federation"
document_id: "500022003"
pdf_url:
=====================================================*/
