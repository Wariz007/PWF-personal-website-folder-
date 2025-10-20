// server.js
import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/connect.js";
import writingRouter from "./routes/writingRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDatabase();

// Initialize express app
const app = express();

// Middleware
app.use(cors()); // enables CORS for all routes
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/api/writings", writingRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
