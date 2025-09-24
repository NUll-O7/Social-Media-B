import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../apiCalls/authCalls";
import { useDispatch } from "react-redux";
import { setProfileData } from "../redux/userSlice";

function Profile() {
  const { userName } = useParams();

  const dispatch = useDispatch();

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
  }, []);

  return <div>Profile Page</div>;
}

export default Profile;
