import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  cartId: { type: String, required: true },
  items: [
    {
      food_item_id: {
        type: Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],

  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Cart = mongoose.models.Cart ?? mongoose.model("Cart", cartSchema);
