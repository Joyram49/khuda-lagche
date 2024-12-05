import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Category =
  mongoose.models.Category ?? mongoose.model("Category", categorySchema);
