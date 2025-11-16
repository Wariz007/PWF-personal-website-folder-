import express from "express";
import multer from "multer";
import path from "path";
import Writing from "../models/writingModel.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

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
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { id, title, tag, date, writing } = req.body;
    if (!id || !title || !tag || !date || !writing)
      return res.status(400).json({ message: "All fields are required" });

    // store only filename in DB
    const imageFilename = req.file ? req.file.filename : "";

    const newWriting = new Writing({
      id,
      title,
      tag,
      date,
      image: imageFilename,
      writing
    });

    await newWriting.save();

    res.status(201).json({
      message: "✅ Writing saved successfully",
      newWriting,
      imageUrl: imageFilename
    });
  } catch (err) {
    res.status(400).json({ message: "Error saving writing", error: err.message });
  }
});

export default router;
