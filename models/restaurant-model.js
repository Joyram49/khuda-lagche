import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  imageUrl: { type: String, required: false },
  thumbnail: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  opening_time: { type: String, required: true },
  closing_time: { type: String, required: true },
  category_ids: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  delivery_time: { type: String, required: false },
  delivery_charge: { type: Number, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Restaurant =
  mongoose.models.Restaurant ?? mongoose.model("Restaurant", restaurantSchema);
