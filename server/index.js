import express from "express";
import dotenv from "dotenv";

import connectToMongodb from "./config/mongodb.js"

import authRouter from "./routes/auth.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

// Utilities
app.use(express.json());

// API's
app.use("/api/auth" , authRouter);

app.listen(port , () => {
    console.log("Server is running on port: " + port);
    connectToMongodb();
})