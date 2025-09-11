import React from "react";
import logo1 from "../assets/socialLogo.png";
import logo2 from "../assets/logo2.png";
import { useSelector } from "react-redux";
import useCurrentUser from '../hooks/useCurrentUser.jsx'

function Navbar() {
  useCurrentUser()
  const {userData} =  useSelector(state=>state.user)
   
  return (
    <div className="w-full h-[70px] bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo1} alt="logo" className="w-[40px]" />
        <h1 className="text-xl font-semibold text-gray-800">Scaler Gram</h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center w-[40%] h-[40px] border border-gray-300 rounded-lg px-3 bg-gray-50 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-300 transition">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Profile + Actions */}
      <div className="flex items-center gap-5">
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Home
        </button>
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Explore
        </button>
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Messages
        </button>

        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
         <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
        {userData.user.name}
        </button>
      </div>
    </div>
  );
}

export default Navbar;