import React from 'react'

export default function NavBar() {
  return (
    <nav className="flex items-center bg-gray-900 p-2 justify-between">
      <div>
        <h1 className=" text-white font-bold">CheckMyRep</h1>
      </div>
      <div>
        {/* <button className="bg-white px-2 py-1 rounded button-outline"> Some nav link</button> */}
      </div>
    </nav>
  )
}
