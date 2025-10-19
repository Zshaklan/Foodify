import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { getImageKitInstance } from "../utils/imagekit.js";
// import connectDB from "../config/db.js";

const isProduction = process.env.NODE_ENV === "production";

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json("All fields are required!");
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new userModel({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User registered successfully!",
        user: {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found!",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User logged in successfully!",
        user: {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          imageUrl: user.imageUrl,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to logged you out." });
  }
};

export const editUserData = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    console.log(fullName, email, phone);

    let imageUrl;
    if (req.file) {
      const imagekit = getImageKitInstance();

      const result = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/Foodify",
      });

      imageUrl = result.url;
      console.log("Upload successful:", imageUrl);
    }

    const updateData = {
      fullName,
      email,
      phone,
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, select: "-password" }
    );

    return res
      .status(201)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
