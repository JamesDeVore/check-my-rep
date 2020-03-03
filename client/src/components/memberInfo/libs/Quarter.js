import React from 'react'
import BarChart from './BarChart'
export default function Quarter(props) {
  console.log(props)
  return (
    <div className="col-span-1">
      <BarChart date={`Quarter ${props.quarter.quarter}, ${props.quarter.year}`} svgID={`B${props.quarter.year}${props.quarter.quarter}`} data={props.quarter.results} />
    </div>
  );
}
