import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUserController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    const { userName, address, phone } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    return res
      .status(200)
      .json({ message: "User updated successfully:", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });

      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save()
    res.status(200).json({message:"Password updated"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(400).json({message:"All fields are required"})
        }

        const user = await User.findOne({email, answer})
        if(!user) return res.status(400).json({message:"User not found or Invalid answer"})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save()
        res.status(200).json({message:"Password reset successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const id =  await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "User deleted successfully", id})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong:", error });
    }
}

export default {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController
};
