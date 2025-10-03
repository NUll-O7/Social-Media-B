import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice.js";
import { getAllPosts } from "../apiCalls/authCalls.js";

function useAllPosts() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await getAllPosts();
        dispatch(setPostData(result));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [dispatch, userData]);
}

export default useAllPosts;
