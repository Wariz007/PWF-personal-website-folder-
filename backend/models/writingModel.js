// models/writingModel.js
import mongoose from "mongoose";

const writingSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  tag: { type: String },
  date: { type: String },
  writing: { type: String, required: true },
  image: { type: String},
});

const Writing = mongoose.model("Writing", writingSchema);

export default Writing;
