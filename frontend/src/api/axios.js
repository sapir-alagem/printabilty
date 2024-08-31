import axios from "axios";

const BASE_URL = "http://localhost:5000";

console.log(BASE_URL);

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://printabilty-backend.up.railway.app"
}
console.log(BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
