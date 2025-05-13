import axios from "axios";

const BASE_SERVICE_URL = "https://ams.gjglobalsoft.com";
// const getToken = () => localStorage.getItem("token");
console.log(BASE_SERVICE_URL);

export const Client = axios.create({
  baseURL: `${BASE_SERVICE_URL}`,
});

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // adjust key as needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
