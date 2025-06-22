import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import connectToMongodb from "./config/mongodb.js";
import questionRoute from "./routes/questionRoutes.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/questions", questionRoute);
app.use("/api/user" , userRouter);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
  connectToMongodb();
});
