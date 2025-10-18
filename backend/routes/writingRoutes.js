// routes/writingRoutes.js
import url from "url";
import Writing from "../models/writingModel.js";

export async function writingRouter(req, res) {
  const parsedUrl = url.parse(req.url, true);

  // GET all writings
  if (parsedUrl.pathname === "/api/writings" && req.method === "GET") {
    try {
      const writings = await Writing.find();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(writings));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Error fetching writings", error: err.message }));
    }
  }

  // POST new writing
  else if (parsedUrl.pathname === "/api/writings" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const newWriting = new Writing(data);
        await newWriting.save();
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Writing saved successfully", newWriting }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error saving writing", error: err.message }));
      }
    });
  }

  // Not Found
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
}
