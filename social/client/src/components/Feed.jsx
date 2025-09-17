// src/components/FeedDesign.jsx
import React from "react";
import logo from "../assets/socialLogo.png";
import Nav from './Nav'

function FeedDesign() {
  return (
    <div
      className="
        w-full min-h-screen 
        bg-[radial-gradient(1200px_800px_at_10%_-10%,#f58529_0%,transparent_35%),radial-gradient(1200px_800px_at_110%_0%,#dd2a7b_0%,transparent_40%),radial-gradient(900px_700px_at_50%_110%,#8134af_0%,transparent_45%),linear-gradient(180deg,#515bd4,#8134af)]
        flex items-center justify-center
      "
    >
      <div className="w-[95%] lg:max-w-[85%] min-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.25)] bg-white">
        
        {/* Header */}
        <div className="w-full h-[80px] flex items-center justify-between px-6 border-b border-neutral-200">
          <img src={logo} alt="Logo" className="w-[100px]" />
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-[26px] h-[26px] bg-neutral-200 rounded-full"></div>
              <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]"></div>
            </div>
            <div className="w-[26px] h-[26px] bg-neutral-200 rounded-full"></div>
          </div>
        </div>

        {/* Stories */}
        <div className="flex w-full overflow-x-auto gap-4 px-6 py-4 border-b border-neutral-200">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="w-[60px] h-[60px] rounded-full bg-neutral-300"></div>
            <p className="text-xs text-neutral-600">Your Story</p>
          </div>
          {Array(6)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <div className="w-[60px] h-[60px] rounded-full bg-neutral-300"></div>
                <p className="text-xs text-neutral-600">User {i + 1}</p>
              </div>
            ))}
        </div>

        <Nav/>

        {/* Feed Posts */}
        <div className="flex-1 w-full px-6 py-6 overflow-y-auto bg-neutral-50">
          {Array(4)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                className="w-full bg-white border border-neutral-200 rounded-xl p-4 mb-6 shadow-sm"
              >
                {/* Post header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-neutral-300"></div>
                  <div>
                    <p className="font-semibold text-sm">User {i + 1}</p>
                    <p className="text-xs text-neutral-500">2h ago</p>
                  </div>
                </div>

                {/* Post image */}
                <div className="w-full h-[220px] bg-neutral-200 rounded-lg mb-3"></div>

                {/* Post actions + caption */}
                <div className="flex gap-4 mb-2">
                  <div className="w-[22px] h-[22px] bg-neutral-300 rounded-full"></div>
                  <div className="w-[22px] h-[22px] bg-neutral-300 rounded-full"></div>
                  <div className="w-[22px] h-[22px] bg-neutral-300 rounded-full"></div>
                </div>
                <p className="text-sm text-neutral-700">
                  This is a sample caption for post {i + 1}.
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FeedDesign;
