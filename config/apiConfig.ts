import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// // Alter defaults after instance has been created
// axiosInstance.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("authToken")}`;

export default axiosInstance;
