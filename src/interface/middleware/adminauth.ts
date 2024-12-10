import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../../helpers/responces";
import { CustomError } from "../../helpers/customeerror";
import { ErrorCodes } from "../../constent/code";

interface RequestWithUser extends Request {
  user?: JwtPayload | string;
}

const adminVerifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return errorResponse(
        res,
        "Your session has expired! Please login again.",
        "Token not found",
        401
      );
    }

    // Verify the token
    const secretKey = process.env.JWT_SECRET || "default-secret-key";
    const decoded = jwt.verify(token, "b1f3d9e8234c57f8a0d2e4a5c6b7e8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7");

    // Attach user info to the request object
    req.user = decoded;
    console.log("Decoded token:", decoded);

    // Check if the user has the admin role
    if (typeof req.user === "object" && req.user?.Role === "admin") {
      return next(); // User is admin, proceed to the next middleware
    }

    return errorResponse(
      res,
      "You are unauthorized to access this resource. Admin rights required.",
      "Unauthorized access",
      403
    );
  } catch (err: unknown) {
    if (err instanceof jwt.JsonWebTokenError) {
      return errorResponse(
        res,
        "Invalid or expired token. Please login again.",
        "JWT verification error",
        401
      );
    }

    if (err instanceof CustomError) {
      return errorResponse(
        res,
        err.message,
        [{ message: err.message }],
        err.statusCode
      );
    }

    console.error("Unexpected error during token verification:", err);
    const customError = new CustomError(
      "An unexpected error occurred",
      500,
      ErrorCodes.INTERNAL_SERVER_ERROR
    );
    return errorResponse(
      res,
      customError.message,
      [{ message: customError.message }],
      customError.statusCode
    );
  }
};

export default adminVerifyToken;
