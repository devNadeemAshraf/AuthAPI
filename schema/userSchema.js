import mongoose from "mongoose";

// Create a user schema for our database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 20,
    },
    profile_image: {
      type: String,
      default: "default",
    },
    default_profile_image: {
      type: String,
      default: "default",
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      default: "user",
    },
    session: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
