import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/user.model";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, contact } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = generateVerificationCode();
      user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        contact: Number(contact),
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 + 1000,
      });
      //! jwt token
      generateToken(res, user);

      await sendVerificationEmail(email, verificationToken);
      const userWithoutPassword = await User.findOne({ email }).select(
        "-password"
      );
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Invalid credential",
      });
    } else {
      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        res.status(404).json({
          success: false,
          message: "Invalid credential",
        });
      }
      //! generate token
      generateToken(res, user);

      user.lastLogin = new Date();
      await user.save();

      const userWithoutPassword = await User.findOne({ email }).select(
        "-password"
      );
      res.status(200).json({
        success: true,
        message: `Welcome back, ${user.fullName}`,
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now },
    }).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    } else {
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      await user.save();

      //! send verification email
      await sendWelcomeEmail(user.email, user.fullName);

      res.status(200).json({
        success: true,
        message: "Email verified successfully",
        user,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, message: "User doesn't exist" });
    } else {
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1hour
      user.resetPasswordToken = resetToken;
      user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

      await user.save();

      // !send email
      await sendPasswordResetEmail(
        user.email,
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
      );
      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "Invalid or expired reset token" });
    } else {
      //update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiresAt = undefined;

      await user.save();

      //! sent success reset email
      await sendResetSuccessEmail(user.email);

      res
        .status(200)
        .json({ success: true, message: "Password was reset successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.id;
    const { fullName, email, address, city, country, profilePicture } =
      req.body;

    // upload image on cloudinary

    const cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = {
      fullName,
      email,
      address,
      city,
      country,
      profilePicture: cloudResponse,
    };
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
