import { NextFunction, Request, Response } from "express";
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
import httpError from "../utils/httpError";
import responseMessage from "../constant/responseMessage";
import httpResponse from "../utils/httpResponse";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, contact } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return httpError(
        next,
        new Error(responseMessage.ALREADY_EXIST("user")),
        req,
        400
      );
    }
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
    httpResponse(req, res, 201, responseMessage.SUCCESS, {
      data: userWithoutPassword,
    });
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("user")),
        req,
        404
      );
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return httpError(
        next,
        new Error(responseMessage.INVALID_CREDENTIALS),
        req,
        400
      );
    }
    //! generate token
    generateToken(res, user);

    user.lastLogin = new Date();
    await user.save();

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    httpResponse(req, res, 200, responseMessage.WELCOME_BACK(user.fullName), {
      data: userWithoutPassword,
    });
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now },
    }).select("-password");

    if (!user) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("user")),
        req,
        404
      );
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //! send verification email
    await sendWelcomeEmail(user.email, user.fullName);
    httpResponse(req, res, 200, responseMessage.EMAIL_VERIFIED_SUCCESS, user);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token");
    httpResponse(req, res, 200, responseMessage.LOGGED_OUT_SUCCESS);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("user")),
        req,
        404
      );
    }
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
    httpResponse(req, res, 200, responseMessage.PASSWORD_RESET_EMAIL);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return httpError(
        next,
        new Error(responseMessage.INVALID_OR_EXPIRED_TOKEN),
        req,
        404
      );
    }
    //update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    //! sent success reset email
    await sendResetSuccessEmail(user.email);

    httpResponse(req, res, 200, responseMessage.PASSWORD_RESET_SUCCESS);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("user")),
        req,
        404
      );
    }
    httpResponse(req, res, 200, responseMessage.SUCCESS, user);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    httpResponse(
      req,
      res,
      200,
      responseMessage.UPDATE_SUCCESS("Profile"),
      user
    );
  } catch (err) {
    httpError(next, err, req, 500);
  }
};
