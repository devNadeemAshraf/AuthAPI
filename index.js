import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3300;

import errorHandler from "./middlewares/errorHandler.js";
import invalidRoute from "./middlewares/invalidRoute.js";
import logAuthUsers from "./middlewares/logAuthUsers.js";

import connectToDB from "./config/mongodb.config.js";

import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// Connect to mongoDB
await connectToDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Custom Middlewares
app.use(errorHandler);
app.use(invalidRoute);
/**app.use(logAuthUsers); */

// Listen
app.listen(process.env.PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
