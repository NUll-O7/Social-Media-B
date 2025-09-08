import React from "react";

import logo2 from "../assets/logo2.png";
import Navbar from "../components/NavBar";

function HomePage() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 w-full flex justify-center py-8 px-4">
        <div className="w-full lg:max-w-[70%] flex gap-6">
          {/* Feed Section */}
          <div className="w-full lg:w-[65%] flex flex-col gap-6">
            {/* Post Card 1 */}
            <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500">2h ago</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Loving the new design of Scaler Gram 🚀✨
              </p>
              <div className="w-full h-56 rounded-lg bg-gray-200"></div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>❤️ 120</span>
                <span>💬 45</span>
                <span>🔗 Share</span>
              </div>
            </div>

            {/* Post Card 2 */}
            <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    Jane Smith
                  </p>
                  <p className="text-xs text-gray-500">5h ago</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Just finished my first project with React & Tailwind 💻🔥
              </p>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>❤️ 80</span>
                <span>💬 22</span>
                <span>🔗 Share</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:flex w-[35%] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex-col justify-start items-center text-white gap-6 p-6 rounded-2xl shadow-2xl">
            {/* Suggested Users */}
            <div className="w-full">
              <p className="font-semibold text-sm mb-3 opacity-90">
                Suggested for you
              </p>

              <div className="flex flex-col gap-4">
                {[
                  {
                    name: "Alex Johnson",
                    img: "https://i.pravatar.cc/150?img=11",
                  },
                  {
                    name: "Emily Davis",
                    img: "https://i.pravatar.cc/150?img=12",
                  },
                  {
                    name: "Michael Lee",
                    img: "https://i.pravatar.cc/150?img=13",
                  },
                ].map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 transition rounded-xl p-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.img}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                      <p className="text-sm">{user.name}</p>
                    </div>
                    <button className="text-xs bg-white text-indigo-600 px-3 py-1 rounded-lg font-semibold hover:bg-indigo-100 transition">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
