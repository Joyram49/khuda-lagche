import mongoose from "mongoose";

export async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }
  try {
    const conn = await mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING)
    );
    console.log("successfully connected to db");
    return conn;
  } catch (err) {
    console.error(err);
  }
}
