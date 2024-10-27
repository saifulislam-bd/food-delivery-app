import { Request, Response } from "express";

export const isAuthenticated = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }
    // verify the token
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
