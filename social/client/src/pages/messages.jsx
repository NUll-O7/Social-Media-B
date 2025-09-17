// src/pages/MessagesDesign.jsx
import React from "react";

function Messages() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full h-[70px] flex items-center px-6 border-b border-neutral-200">
        <h1 className="text-neutral-800 text-lg font-semibold">Messages</h1>
      </div>

      {/* Online Users */}
      <div className="w-full h-[80px] flex gap-4 items-center overflow-x-auto px-6 py-3 border-b border-neutral-200">
        {Array(6)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 shrink-0"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-neutral-300"></div>
              <p className="text-xs text-neutral-500">User {i + 1}</p>
            </div>
          ))}
      </div>

      {/* Previous Chats */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 cursor-pointer"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-neutral-300"></div>
              <div>
                <p className="text-sm font-medium text-neutral-800">
                  Chat User {i + 1}
                </p>
                <p className="text-xs text-blue-500">Active Now</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Messages;
