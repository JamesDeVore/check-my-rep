import React from "react";
import NavSearch from "./NavSearch";
export default function NavBar() {
  return (
    <nav className="flex items-center bg-gray-900 p-2 justify-between">
      <div>
        <h1 className=" text-white sm:text-md text-xs font-bold">CheckMyRep</h1>
      </div>
      <div>
        <NavSearch />
      </div>
    </nav>
  );
}
