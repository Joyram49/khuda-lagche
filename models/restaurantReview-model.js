import mongoose, { Schema } from "mongoose";

const restaurantReviewSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
export const RestaurantReview =
  mongoose.models.RestaurantReview ??
  mongoose.model("RestaurantReview", restaurantReviewSchema);
