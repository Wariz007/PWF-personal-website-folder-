import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import connectToDatabase from "./database/connect.js";
import writingRouter from "./routes/writingRoutes.js";
import { login, verifyToken } from "./auth.js"; // 🔒 add this

dotenv.config();
connectToDatabase();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/images", express.static(join(__dirname, "public/images")));

// 🔐 Auth route
app.post("/api/login", login);

// 🧾 Public routes
app.use("/api/writings", writingRouter);

// 🧱 Example protected route (for admin actions)
app.use("/api/admin/writings", verifyToken, writingRouter);

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
