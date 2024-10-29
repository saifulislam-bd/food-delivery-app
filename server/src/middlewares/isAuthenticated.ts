import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as jwt.JwtPayload;

    if (!decoded) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.id = decoded.userId;
    return next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
