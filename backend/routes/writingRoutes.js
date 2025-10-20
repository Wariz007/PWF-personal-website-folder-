// routes/writingRoutes.js
import express from "express";
import Writing from "../models/writingModel.js";

const router = express.Router();

// ---------------- GET all writings ----------------
router.get("/", async (req, res) => {
  try {
    const writings = await Writing.find();
    res.status(200).json(writings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching writings", error: err.message });
  }
});

// ---------------- POST new writing ----------------
router.post("/", async (req, res) => {
  try {
    const newWriting = new Writing(req.body);
    await newWriting.save();
    res.status(201).json({ message: "Writing saved successfully", newWriting });
  } catch (err) {
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

    res.status(200).json(updatedWriting);
  } catch (err) {
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

    res.status(200).json({ message: "Writing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting writing", error: err.message });
  }
});

export default router;