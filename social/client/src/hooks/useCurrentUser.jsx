import React from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../apiCalls/authCalls";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const result = await getCurrentUser();
        console.log(result)
        dispatch(setUserData(result));
      } catch (error) {
        console.error(error);
      }
    };

    fetchuser();
  }, []);
}

export default useCurrentUser;
