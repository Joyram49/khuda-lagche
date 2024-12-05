import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [
    {
      food_item_id: {
        type: Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  order_status: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
    default: "pending",
    required: true,
  },
  billing_address: { type: String, required: false },
  delivery_address: { type: String, required: true },
  payment_method: { type: String, required: true },
  paymentId: { type: String, required: true },
  placed_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Order =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
