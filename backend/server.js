// server.js
import http from "http";
import connectToDatabase from "./database/connect.js";
import { writingRouter } from "./routes/writingRoutes.js";

// connect to MongoDB
connectToDatabase();

const server = http.createServer(async (req, res) => {
  await writingRouter(req, res);
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
