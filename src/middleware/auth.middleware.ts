import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (typeof decoded === "object" && decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({ error: "Invalid Token" });
      return;
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
    return;
  }
};
