import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose
        .connect(process.env.MONGODB_URI, {
          serverSelectionTimeoutMS: 30000,
          bufferCommands: false,
        })
        .then((mongoose) => mongoose);
    }

    console.log(`MongoDB connected: ${conn.connection.host}`);
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.log("MongoDB connection error :", error.message);
    process.exit(1);
  }
};

export default connectDB;
