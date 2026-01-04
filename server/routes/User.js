import express from "express";
import {
  UserLogin,
  UserRegister,
  addWorkout,
  getUserDashboard,
  getWorkoutsByDate,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/* ========= AUTH ========= */
router.post("/register", UserRegister);
router.post("/login", UserLogin);

/* ======= DASHBOARD ======= */
router.get("/dashboard", verifyToken, getUserDashboard);

/* ======== WORKOUT ======== */
router.post("/workout", verifyToken, addWorkout);
router.get("/workouts", verifyToken, getWorkoutsByDate);

export default router;
