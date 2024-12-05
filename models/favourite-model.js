import mongoose, { Schema } from "mongoose";

const favouriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  restaurant_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Favourite =
  mongoose.models.Favourite ?? mongoose.model("Favourite", favouriteSchema);
