import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

// Export our MongoDB Connection
// We cal always add in more code if needed for db config
export const connectToMongoDB = expressAsyncHandler(async () => {
  try {
    return await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB Connected");
    });
  } catch (error) {
    throw new Error(error);
  }
});
