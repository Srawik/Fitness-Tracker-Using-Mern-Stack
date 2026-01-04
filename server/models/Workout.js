import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // 🔍 fast user-based queries
    },

    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },

    workoutName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    sets: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    reps: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: Number, // minutes
      required: true,
      min: 1,
      max: 300,
    },

    caloriesBurned: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      default: Date.now,
      index: true, // 🔍 fast date-based filtering
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Workout", WorkoutSchema);
