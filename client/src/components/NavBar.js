import React from "react";
import NavSearch from "./NavSearch";
export default function NavBar() {
  return (
    <nav className="flex items-center bg-gray-900 p-2 justify-between">
      <div className="flex flex-col">
        <h1 className=" text-white sm:text-md text-sm mr-4 font-bold">
          CheckMyRep
        </h1>
        <p className="text-xs text-white">
          Data sourced from <a className="underline" href="https://www.propublica.org/">
          ProPublica</a>
        </p>
      </div>
      <div>
        <NavSearch />
      </div>
    </nav>
  );
}
