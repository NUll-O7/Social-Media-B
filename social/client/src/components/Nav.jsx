// src/components/NavDesign.jsx
import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch, FiPlusSquare } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function NavDesign() {
  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user)

  return (
    <div
      className="
        w-[90%] lg:w-[40%] h-[70px] 
        bg-white rounded-full
        fixed bottom-5 left-1/2 -translate-x-1/2
        flex justify-around items-center
        shadow-[0_6px_20px_rgba(0,0,0,0.15)]
        px-4
        z-[100]
      "
    >
      {/* Icons */}
      <GoHomeFill className="text-neutral-700 cursor-pointer w-[24px] h-[24px] hover:text-black" />
      <FiSearch className="text-neutral-700 cursor-pointer w-[24px] h-[24px] hover:text-black" />
      <FiPlusSquare className="text-neutral-700 cursor-pointer w-[24px] h-[24px] hover:text-black" />
      <RxVideo className="text-neutral-700 cursor-pointer w-[26px] h-[26px] hover:text-black" />

      {/* Avatar */}
      <div onClick={()=>navigate(`/profile/${userData?.userName}`)}  className="w-[40px] h-[40px] rounded-full overflow-hidden border border-neutral-300 cursor-pointer">
        <img  alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default NavDesign;
