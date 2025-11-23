import express from "express";
import Writing from "../models/writingModel.js";
import { parser } from "../Middleware/upload.js";

const router = express.Router();

// ---------- GET all writings ----------
router.get("/", async (req, res) => {
  try {
    const writings = await Writing.find().sort({ date: -1 });
    res.status(200).json(writings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching writings", error: err.message });
  }
});

// ---------- POST new writing ----------
router.post("/", parser.single("image"), async (req, res) => {
  try {
    const { id, title, tag, date, writing } = req.body;
    if (!id || !title || !tag || !date || !writing)
      return res.status(400).json({ message: "All fields are required" });

    const imageUrl = req.file ? req.file.path : "";

    const newWriting = new Writing({
      id,
      title,
      tag,
      date,
      image: imageUrl,
      writing
    });

    await newWriting.save();

    res.status(201).json({
      message: "✅ Writing saved successfully",
      newWriting,
      imageUrl
    });
  } catch (err) {
    res.status(400).json({ message: "Error saving writing", error: err.message });
  }
});

export default router;