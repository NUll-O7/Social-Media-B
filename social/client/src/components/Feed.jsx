import React from "react";
import logo1 from "../assets/logo.png";
import { FaRegHeart } from "react-icons/fa6";
import { BiMessageAltDetail } from "react-icons/bi";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import Post from "./Post";

function Feed() {
  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      {/* Top Bar (Mobile Only) */}
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img src={logo} alt="" className="w-[80px]" />
        <div className="flex items-center gap-[10px]">
          <div className="relative">
            <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
            <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]"></div>
          </div>
          <BiMessageAltDetail className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>

      {/* Stories Row */}
      <div className="flex w-full justify-start overflow-x-auto gap-[10px] items-center p-[20px]">
        <StoryDp userName="Your Story" />
        <StoryDp userName="Friend1" />
        <StoryDp userName="Friend2" />
        <StoryDp userName="Friend3" />
      </div>

      {/* Posts Section */}
      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Feed;
