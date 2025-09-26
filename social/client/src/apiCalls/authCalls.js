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
