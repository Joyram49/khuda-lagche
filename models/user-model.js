import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "vendor", "customer"],
    default: "customer",
    required: true,
  },
  profilePicture: String,
  address: String,
  phone: String,
  restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant" }, // For vendors
  order_history: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
