import React, {useEffect, useLayoutEffect} from 'react'
import Quarter from './Quarter'
export default function Expenses(props) {
  console.log(props)
  return (
    <div className="grid grid-cols-4 bg-blue-400">

      <Quarter quarter={props.expenses.results[0]} />
    </div>
  )
}
