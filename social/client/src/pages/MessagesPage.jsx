import React from 'react';
import Messages from './Messages';
import logo from "../assets/socialLogo.png";
import Nav from "../components/Nav";

function MessagesPage() {
  return (
    <div
      className="
        w-full min-h-screen 
        bg-[radial-gradient(1200px_800px_at_10%_-10%,#f58529_0%,transparent_35%),radial-gradient(1200px_800px_at_110%_0%,#dd2a7b_0%,transparent_40%),radial-gradient(900px_700px_at_50%_110%,#8134af_0%,transparent_45%),linear-gradient(180deg,#515bd4,#8134af)]
        flex items-center justify-center
        py-6
      "
    >
      <div className="w-[95%] lg:max-w-[85%] h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.25)] bg-white">
        
        {/* Header */}
        <div className="w-full h-[80px] flex items-center justify-between px-6 border-b border-neutral-200 flex-shrink-0">
          <img src={logo} alt="Logo" className="w-[100px]" />
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-[26px] h-[26px] bg-neutral-200 rounded-full"></div>
              <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]"></div>
            </div>
            <div className="w-[26px] h-[26px] bg-neutral-200 rounded-full"></div>
          </div>
        </div>

        {/* Messages Content - Takes remaining space */}
        <div className="flex-1 w-full overflow-hidden">
          <Messages />
        </div>

        {/* Bottom Nav */}
        <div className="flex-shrink-0 pb-20">
          <Nav />
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;