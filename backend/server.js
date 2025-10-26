// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import connectToDatabase from "./database/connect.js";
import writingRouter from "./routes/writingRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDatabase();

// Initialize express app
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors()); // enables CORS for all routes
app.use(express.json()); // parse JSON bodies

// to Serve static files (images, etc.) from backend/public
app.use("/public", express.static(join(__dirname, "public")));

// Routes
app.use("/api/writings", writingRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
