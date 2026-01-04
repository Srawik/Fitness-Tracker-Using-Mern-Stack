import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "Authentication token missing"));
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        return next(createError(403, "Invalid or expired token"));
      }

      // decoded => { id: userId, iat, exp }
      req.user = { id: decoded.id };
      next();
    });
  } catch (err) {
    next(err);
  }
};
