// routes/writingRoutes.js
import express from "express";
import Writing from "../models/writingModel.js";

const router = express.Router();

// ---------------- GET all writings ----------------
router.get("/", async (req, res) => {
  try {
    const writings = await Writing.find().sort({ date: -1 }); // newest first
    res.status(200).json(writings);
  } catch (err) {
    console.error("❌ Error fetching writings:", err.message);
    res.status(500).json({ message: "Error fetching writings", error: err.message });
  }
});

// ---------------- POST new writing ----------------
router.post("/", async (req, res) => {
  try {
    const { id, title, tag, date, image, uploaded, writing } = req.body;

    if (!id || !title || !tag || !date || !writing) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newWriting = new Writing({
      id,
      title,
      tag,
      date,
      image: image || "", 
      uploaded: uploaded || false,
      writing
    });

    await newWriting.save();

    res.status(201).json({
      message: "✅ Writing saved successfully",
      newWriting
    });
  } catch (err) {
    console.error("❌ Error saving writing:", err.message);
    res.status(400).json({ message: "Error saving writing", error: err.message });
  }
});

// ---------------- PATCH (update writing) ----------------
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWriting = await Writing.findOneAndUpdate(
      { id: Number(id) },
      req.body,
      { new: true }
    );

    if (!updatedWriting)
      return res.status(404).json({ message: "Writing not found" });

    res.status(200).json({ message: "✅ Writing updated successfully", updatedWriting });
  } catch (err) {
    console.error("❌ Error updating writing:", err.message);
    res.status(500).json({ message: "Error updating writing", error: err.message });
  }
});

// ---------------- DELETE (remove writing) ----------------
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWriting = await Writing.findOneAndDelete({ id: Number(id) });

    if (!deletedWriting)
      return res.status(404).json({ message: "Writing not found" });

    res.status(200).json({ message: "✅ Writing deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting writing:", err.message);
    res.status(500).json({ message: "Error deleting writing", error: err.message });
  }
});

export default router;
