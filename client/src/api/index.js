import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("fittrack-app-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ===== AUTH ===== */
export const UserSignUp = (data) => API.post("/user/register", data);
export const UserSignIn = (data) => API.post("/user/login", data);

/* ===== DASHBOARD ===== */
export const getDashboardDetails = () =>
  API.get("/user/dashboard");

/* ===== WORKOUT ===== */
export const getWorkouts = (date = "") =>
  API.get(`/user/workouts${date ? `?date=${date}` : ""}`);

export const addWorkout = (data) =>
  API.post("/user/workout", data);

export default API;
