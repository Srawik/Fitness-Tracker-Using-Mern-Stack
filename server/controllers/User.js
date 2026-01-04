import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

/* ============================
   REGISTER USER
============================ */
export const UserRegister = async (req, res, next) => {
  try {
    const { name, email, password, img } = req.body;

    if (!name || !email || !password) {
      return next(createError(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      img,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT,
      { expiresIn: "7d" }
    );

    const { password: pwd, ...safeUser } = user._doc;

    res.status(201).json({ token, user: safeUser });
  } catch (err) {
    next(err);
  }
};

/* ============================
   LOGIN USER
============================ */
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(401, "Invalid credentials"));
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT,
      { expiresIn: "7d" }
    );

    const { password: pwd, ...safeUser } = user._doc;

    res.status(200).json({ token, user: safeUser });
  } catch (err) {
    next(err);
  }
};

/* ============================
   DASHBOARD DATA
============================ */
export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const workouts = await Workout.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    const totalCaloriesBurnt = workouts.reduce(
      (sum, w) => sum + w.caloriesBurned,
      0
    );

    const totalWorkouts = workouts.length;

    const avgCaloriesBurntPerWorkout =
      totalWorkouts > 0 ? totalCaloriesBurnt / totalWorkouts : 0;

    /* ===== Pie Chart ===== */
    const categoryMap = {};
    workouts.forEach((w) => {
      categoryMap[w.category] =
        (categoryMap[w.category] || 0) + w.caloriesBurned;
    });

    const pieChartData = Object.entries(categoryMap).map(
      ([label, value], index) => ({
        id: index,
        label,
        value,
      })
    );

    /* ===== Weekly Bar Chart ===== */
    const weekMap = {};
    workouts.forEach((w) => {
      const day = w.date.toLocaleDateString("en-US", {
        weekday: "short",
      });
      weekMap[day] = (weekMap[day] || 0) + w.caloriesBurned;
    });

    res.status(200).json({
      totalCaloriesBurnt,
      totalWorkouts,
      avgCaloriesBurntPerWorkout,
      pieChartData,
      totalWeeksCaloriesBurnt: {
        weeks: Object.keys(weekMap),
        caloriesBurned: Object.values(weekMap),
      },
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
   GET WORKOUTS BY DATE
============================ */
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const date = req.query.date
      ? new Date(req.query.date)
      : new Date();

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const workouts = await Workout.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    res.status(200).json({
      todaysWorkouts: workouts,
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
   ADD WORKOUT
============================ */
export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { workoutString } = req.body;

    if (!workoutString) {
      return next(createError(400, "Workout string is required"));
    }

    const workoutBlocks = workoutString
      .split("#")
      .filter(Boolean);

    const savedWorkouts = [];

    for (const block of workoutBlocks) {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      if (lines.length < 5) {
        return next(createError(400, "Invalid workout format"));
      }

      const workout = parseWorkout(lines);
      workout.caloriesBurned = calculateCalories(workout);
      workout.user = userId;

      const saved = await Workout.create(workout);
      savedWorkouts.push(saved);
    }

    res.status(201).json({
      message: "Workout added successfully",
      workouts: savedWorkouts,
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
   HELPERS
============================ */

const parseWorkout = (lines) => {
  const category = lines[0];
  const workoutName = lines[1];

  const sets = Number(lines[2].match(/(\d+)/)?.[1]);
  const reps = Number(lines[2].match(/X\s*(\d+)/i)?.[1]);
  const weight = Number(lines[3].match(/(\d+)/)?.[1]);
  const duration = Number(lines[4].match(/(\d+)/)?.[1]);

  if (!sets || !reps || !weight || !duration) {
    throw new Error("Invalid workout format");
  }

  return {
    category,
    workoutName,
    sets,
    reps,
    weight,
    duration,
    date: new Date(),
  };
};

const calculateCalories = (workout) => {
  return workout.duration * workout.weight * 5;
};
