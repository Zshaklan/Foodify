import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Please enter a valid phone number"],
  },
  password: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("user", userSchema);
export default User;
