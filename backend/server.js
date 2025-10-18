// server.js
import http from "http";
import connectToDatabase from "./database/connect.js";
import { writingRouter } from "./routes/writingRoutes.js";

// connect to MongoDB
connectToDatabase();

const server = http.createServer(async (req, res) => {
  // ✅ Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Route requests
  await writingRouter(req, res);
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
