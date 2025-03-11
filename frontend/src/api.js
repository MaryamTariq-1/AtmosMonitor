import axiosInstance from "./utils/axios";

// API call for sign-in (login)
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/signin", { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred while logging in";
  }
};

// API call for sign-up (register)
export const signup = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/auth/signup", { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred during sign-up";
  }
};

// API call for sending OTP for password reset
export const sendOtpForPasswordReset = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", { email });
    return response.data;  // Success message for OTP request
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred while sending OTP";
  }
};

// API call to verify OTP and reset password
export const verifyOtpAndResetPassword = async (email, otp, newPassword) => {
  try {
    const otpResponse = await axiosInstance.post("/auth/verify-otp", { email, otpEntered: otp });
    if (otpResponse.data.message === "OTP verified successfully.") {
      // Proceed to reset password after successful OTP verification
      const resetResponse = await axiosInstance.post("/auth/reset-password", { email, newPassword });
      return resetResponse.data;
    }
    throw new Error("OTP verification failed");
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred while resetting the password";
  }
};

// API call to verify OTP for login
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", { email, otpEntered: otp });
    return response.data; // Success message after OTP verification
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred while verifying OTP";
  }
};
