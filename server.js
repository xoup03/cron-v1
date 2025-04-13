import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import "./jobs/resetOrderNumber.js"; // Import to trigger scheduler

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("✅ API is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
