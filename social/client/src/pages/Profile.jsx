import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../apiCalls/authCalls";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../redux/userSlice";
import logo from "../assets/socialLogo.png";
import Nav from "../components/Nav";



function Profile() {
  const { userName } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate()

   const {profileData , userData} = useSelector(state =>state.user)
   console.log(profileData)

  async function handleProfile() {
    try {
      const userResult = await getProfile(userName);

      dispatch(setProfileData(userResult));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleProfile();
  }, [userName , dispatch]);

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

        {/* Profile Section */}
        <div className="flex-1 w-full px-6 py-8 overflow-y-auto bg-neutral-50">
          <div className="w-full bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-6">
                <img
                 
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-neutral-200 shadow-md"
                />
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">
                    {profileData?.name}
                  </h1>
                  <p className="text-sm text-neutral-600">
                   {profileData?.userName}
                  </p>
                  <p className="mt-1 text-neutral-500 text-sm">
                   {profileData?.bio}
                  </p>
                
                </div>
              </div>

              {/* Right: Edit Profile button (only for logged-in user’s own profile) */}
              {userData?.userName === profileData?.userName && (
                <button
                  onClick={() => navigate(`/editprofile/`)}
                  className="mt-4 sm:mt-0 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
              <div>
                <div className="font-bold text-lg">
                  {profileData?.posts.length}
                </div>
                <div className="text-neutral-500 text-sm">Posts</div>
              </div>
              <div>
                <div className="font-bold text-lg">
                  {profileData?.followers.length}
                </div>
                <div className="text-neutral-500 text-sm">Followers</div>
              </div>
              <div>
                <div className="font-bold text-lg">
                  {profileData?.following.length}
                </div>
                <div className="text-neutral-500 text-sm">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <Nav />
      </div>
    </div>
  );
}

export default Profile;
