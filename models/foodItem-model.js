import mongoose, { Schema } from "mongoose";

const foodItemSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  delivery_time: String,
  preparation_time: String,
  image_url: String,
  availability: { type: Boolean, default: true },
  tags: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const FoodItem =
  mongoose.models.FoodItem ?? mongoose.model("FoodItem", foodItemSchema);
