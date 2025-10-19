// routes/writingRoutes.js
import url from "url";
import Writing from "../models/writingModel.js";

export async function writingRouter(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // ---------------- GET all writings ----------------
  if (pathname === "/api/writings" && req.method === "GET") {
    try {
      const writings = await Writing.find();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(writings));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Error fetching writings", error: err.message }));
    }
  }

  // ---------------- POST new writing ----------------
  else if (pathname === "/api/writings" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
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

  // ---------------- PATCH (update writing) ----------------
  else if (pathname.startsWith("/api/writings/") && req.method === "PATCH") {
    const id = pathname.split("/").pop();
    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "ID is required" }));
    }

    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const updateData = JSON.parse(body);
        const updatedWriting = await Writing.findOneAndUpdate({ id: Number(id) }, updateData, { new: true });
        if (!updatedWriting) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Writing not found" }));
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedWriting));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error updating writing", error: err.message }));
      }
    });
  }

  // ---------------- DELETE (remove writing) ----------------
  else if (pathname.startsWith("/api/writings/") && req.method === "DELETE") {
    const id = pathname.split("/").pop();
    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "ID is required" }));
    }

    try {
      const deletedWriting = await Writing.findOneAndDelete({ id: Number(id) });
      if (!deletedWriting) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Writing not found" }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Writing deleted successfully" }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Error deleting writing", error: err.message }));
    }
  }

  // ---------------- Not Found ----------------
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
}