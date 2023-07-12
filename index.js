import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3300;

import errorHandler from "./middlewares/errorHandler";
import invalidRoute from "./middlewares/invalidRoute";
import logAuthUsers from "./middlewares/logAuthUsers";

import connectToMongoDB from "./config/mongodb.config";

import express from "express";
import authRouter from "./routes/authRoutes";

const app = express();

// Connect to mongoDB
connectToMongoDB();

// Express Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);

// Custom Middlewares
app.use(errorHandler);
app.use(invalidRoute);
app.use(logAuthUsers);

// Listen
app.listen(process.env.PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
