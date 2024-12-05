import mongoose, { Schema } from "mongoose";

const foodItemReviewSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fooditem_id: { type: Schema.Types.ObjectId, ref: "FoodItem", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
export const FoodItemReview =
  mongoose.models.FoodItemReview ??
  mongoose.model("FoodItemReview", foodItemReviewSchema);
