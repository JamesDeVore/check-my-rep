import React from 'react'

export default function LoadingScreen(props) {

  let containerBase =
    "absolute w-screen h-screen bg-gray-800 flex justify-center items-center transition duration-1000 transition-opacity";

  if(!props.loading){
    containerBase += " opacity-0 hidden"
  }
  return (
    <div className={containerBase}>
      <h1>Loading....</h1>
    </div>
  )
}
