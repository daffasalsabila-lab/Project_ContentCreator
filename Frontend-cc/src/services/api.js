import axios from "axios";

const api = axios.create({
  // Mengarahkan langsung ke IP server jaringan lokal agar laptop lain bisa mengakses tanpa kendala CORS
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token refresh or redirect to login
      console.log("Unauthorized! Token may have expired.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; //
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => response.data,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle token refresh or redirect to login
//       console.log("Unauthorized! Token may have expired.");
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   },
// );

// export default api;
