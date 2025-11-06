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

    const imagePath = req.file ? `/images/${req.file.filename}` : "";

    const newWriting = new Writing({
      id,
      title,
      tag,
      date,
      image: imagePath,
      writing
    });

    await newWriting.save();

    res.status(201).json({
      message: "✅ Writing saved successfully",
      newWriting,
      imageUrl: imagePath
    });
  } catch (err) {
    res.status(400).json({ message: "Error saving writing", error: err.message });
  }
});

// ---------- PATCH ----------
router.patch("/:id", async (req, res) => {
  try {
    const updatedWriting = await Writing.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true }
    );
    if (!updatedWriting) return res.status(404).json({ message: "Writing not found" });
    res.status(200).json({ message: "✅ Writing updated successfully", updatedWriting });
  } catch (err) {
    res.status(500).json({ message: "Error updating writing", error: err.message });
  }
});

// ---------- DELETE ----------
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Writing.findOneAndDelete({ id: Number(req.params.id) });
    if (!deleted) return res.status(404).json({ message: "Writing not found" });
    res.status(200).json({ message: "✅ Writing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting writing", error: err.message });
  }
});

export default router;
