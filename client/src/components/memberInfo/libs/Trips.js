import React from "react";
import moment from 'moment'


export default function Trips(props) {
  console.log(props);
  const renderTableRows = () => {
    let rows = []
    if(props.trips){
      let cellClass = " border-l border-gray-900 px-2";
      if(props.trips.results.length > 10){
        props.trips.results.length = 10; //prolong the use of my key
      }
       rows = props.trips.results.map((trip, index) => {
         let rowClass = "bg-white"
         if(trip.is_member){
          rowClass += " font-bold"
         }
         if(index % 2 === 0){
          rowClass += " bg-gray-300"
         }
         return (
           <tr className={rowClass}>
             <td className={cellClass}>{trip.destination}</td>
             <td className={cellClass}>{trip.traveler}</td>

             <td className={cellClass + " w-16"}>
               {moment(trip.departure_date).format("MM/DD/YY")}
             </td>
             <td className={cellClass}>{trip.sponsor}</td>

             <td className={cellClass}>
               <a
                 className="text-blue-600 underline"
                 target="_blank"
                 href={trip.pdf_url}
               >
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
    <div className="bg-white mx-4 sm:p-6 rounded shadow-lg text-sm">
      <table className="bg-gray-200 border border-black border-collapse rounded text-gray-900">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className={headerClass}>Destination</th>
            <th className={headerClass}>Traveler</th>
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
