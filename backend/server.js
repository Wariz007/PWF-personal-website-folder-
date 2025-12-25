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

// --- MIDDLEWARE ---
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",                       
    "https://olusanyaolabodeabdulwariz.com",     
    "https://www.olusanyaolabodeabdulwariz.com"
  ],
  credentials: true
}));
app.use(express.json());
app.use(
  "/images",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(join(__dirname, "public/images"))
);

// 🔐 Auth route
app.post("/api/login", login);

// 🧾 Public routes
app.use("/api/writings", writingRouter);

// 🧱 Protected route for admin actions
app.use("/api/admin/writings", verifyToken, writingRouter);

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
