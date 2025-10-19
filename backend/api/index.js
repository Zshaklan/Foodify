import app from "../src/app.js";
import connectDB from "../src/config/db.js";

// Connect to database once
let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res);
}
