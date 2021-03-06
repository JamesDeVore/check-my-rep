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
    <div
      className=" border container flex flex-row justify-center mx-auto p-10 sm:h-screen text-gray-100"
      style={divStyle}
    >
      <div className="flex flex-col h-full items-center justify-evenly p-4 rounded sm:w-4/5 welcomeBacksplash">
        <div className=" mb-6 flex-col flex items-center">
          <h1 className="font-bold mt-32 sm:mt-0 text-3xl text-gray-200 title">
            Check My Representative
          </h1>
          <hr className="m-8 w-4/5" />
          <h3 className="text-lg mb-2">
            This tool will allow you to see the recent activity of any current
            member of congress
          </h3>
          <h4 className="text-lg">
            Everything from voting patterns, to bills sponsored, to recent trips
            paid for by their office.
          </h4>
        </div>
        <GetStarted />
      </div>
    </div>
  );
}
