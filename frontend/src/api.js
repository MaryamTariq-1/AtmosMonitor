import axios from "axios";

// Set up the base URL for the backend API
const api = axios.create({
  baseURL: "http://localhost:3001/api",  // Adjust to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});



// API call for sign-in (login)
export const login = async (email, password) => {
  try {
    const response = await api.post("/signin", { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred while logging in";
  }
};

// API call for sign-up (register)
export const signup = async (name, email, password) => {
  try {
    const response = await api.post("/signup", { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred during sign-up";
  }
};

// API call for forgot password
export const resetPassword = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred while requesting password reset";
  }
};
