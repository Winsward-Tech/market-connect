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
