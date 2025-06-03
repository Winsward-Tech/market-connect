import { apiClient } from "./config";

export const apiRegister = async (payload) => {
  return apiClient.post("/api/auth/register", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiLogin = async (payload) =>
  apiClient.post("/api/auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

//export const apiForgotPassword =  (payload) => apiClient.post("/users/forgot-password", payload);

export const sendOTP = async (phoneNumber) => {
  return apiClient.post(
    "/api/otp/send",
    { phoneNumber },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const verifyOTP = async (phoneNumber, otp) => {
  return apiClient.post(
    "/api/otp/verify",
    { phoneNumber, otp },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getCurrentUser = async () => {
  return apiClient.get("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const initiateResetPin = async (phoneNumber) => {
  return apiClient.post(
    "/api/reset-pin/initiate",
    { phoneNumber },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getUserById = async (userId) => {
  return apiClient.get(`/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/api/users/${userId}`, userData);
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
