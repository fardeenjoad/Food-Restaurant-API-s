import User from "../models/userModel.js";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import { token } from "morgan";

export const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;

    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
      console.log("Error during hashing:", error);
      return res
        .status(500)
        .json({ message: "Error while hashing", err: error.message });
    }

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    if (user) {
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:'2h',
    });

    return res.status(200).json({ message: "Login successfully:", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default { registerController, loginController };
