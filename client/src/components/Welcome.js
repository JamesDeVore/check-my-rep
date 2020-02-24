import React from "react";
import capitol from "../assets/capitolNight.jpeg";
import GetStarted from "../components/GetStarted";
export default function Welcome() {
  const divStyle = {
    backgroundImage: `url(${capitol})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  };
  return (
    <div className=" h-screen container mx-auto p-10 text-gray-100" style={divStyle}>
      <div className="welcomeBacksplash h-full w-full p-4 rounded">
        <div className=" mb-6 flex-col flex items-center">
          <h1 className="title text-gray-200 text-3xl font-bold">
            Representative Tracker
          </h1>
          <hr className="m-8 w-4/5" />
          <h3 className="subtitle">
            This tool will show any given representative recent voting history.
            Cupidatat ea esse fugiat nulla aliqua duis aute sint elit id. Nulla
            do in ullamco voluptate esse ut qui. 
          </h3>
        </div>
        <GetStarted />
      </div>
    </div>
  );
}
