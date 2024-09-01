import axios from "axios";

let BASE_URL = "http://localhost:5000";


if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://printabilty-backend.up.railway.app"
}

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
