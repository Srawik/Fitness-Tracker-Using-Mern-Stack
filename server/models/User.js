import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },

    img: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 never return password by default
    },

    age: {
      type: Number,
      min: 10,
      max: 100,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
