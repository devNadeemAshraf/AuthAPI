import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

async function connectToDB() {
  try {
    await mongoose.connect(uri).then(() => {
      console.log("Connected to MONGODB");
    });
  } catch (error) {
    throw new Error("Failed to connect to DB");
  }
}

export default connectToDB;
