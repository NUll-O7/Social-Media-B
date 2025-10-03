import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // always send cookies/credentials
});

// Sign Up
export const signUp = async (userData) => {
  try {
    const response = await api.post("/api/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signIn = async (userData) => {
  try {
    const response = await api.post("/api/auth/signin", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/user/current", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};

export const getProfile = async (userName) => {
  try {
    const response = await api.get(`/api/user/getprofile/${userName}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};

export const editProfile = async (formData) => {
  try {
    const response = await api.post(`/api/user/editprofile/`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};


export const createPost = async (formData)=>{
    try {
    const response = await api.post(`/api/post/upload/`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user data";
  } 
}

// Get all the Posts


export const getAllPosts = async ()=>{
    try {
    const response = await api.get(`/api/post/getAllPosts`,  {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch Posts";
  } 
}

// post Like

export const likePost = async (postId) => {
  try {
    const response = await api.post(`/api/post/like/${postId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to like post";
  }
}


// Follow unFollow and Status calls

export const followUser = async (userId) => {
  try {
    const response = await api.post(`/api/follow/${userId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to follow user";
  }
}

export const unfollowUser = async (userId) => {
  try {
    const response = await api.post(`/api/follow/unfollow/${userId}`, {}, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to unfollow user";
  }
}

export const getFollowStatus = async (userId) => {
  try {
    const response = await api.get(`/api/follow/status/${userId}`, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to get follow status";
  }
}


// get suggseted Users
export const getSuggestions = async () => {
  try {
    const response = await api.get(`/api/user/suggested`)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile data";
  }
}



