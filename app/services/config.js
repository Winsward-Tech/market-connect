import axios from "axios";

// Use a default value if environment variable is not set
const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://market-connect-api-1.onrender.com";

// Debug log to check the base URL
console.log("API Base URL:", baseURL);

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // Debug log to check the full URL being called
  console.log("Making request to:", `${config.baseURL}${config.url}`);

  // Get access token from localStorage
  const token = localStorage.getItem("token");
  // Attach token to authorization header if it exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhanced error logging
    if (error.response) {
      console.error("API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
        baseURL: error.config.baseURL,
        fullURL: `${error.config.baseURL}${error.config.url}`,
      });
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
      return Promise.reject(new Error("No response from server"));
    } else {
      console.error("Request setup error:", error.message);
      return Promise.reject(error);
    }
  }
);
