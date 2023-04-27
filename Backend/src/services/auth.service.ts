import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  buildErrorObject,
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../utils/errors.utils";
import { findUserByToken } from "../models/users.model";
import { IErrorResponse } from "./../types/index.d";

async function authenticateJWTMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      const error = buildErrorObject(401, "Your are not authenticated.");
      return res.status(error.errorCode).json({ error: error });
    }

    const userTokens = await findUserByToken(token);
    if (
      token !== userTokens?.accessToken ||
      userTokens.accessState === "Pending" ||
      userTokens.accessState === "Inactive"
    ) {
      const error = buildErrorObject(
        403,
        "Your are not authorized to access these resources."
      );
      return res.status(error.errorCode).json({ error: error });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, user) => {
      if (err) {
        const error = buildErrorObject(
          403,
          "Your are not authorized to access these resources."
        );
        return res.status(error.errorCode).json({ error: error });
      }

      user = user as {
        id: string;
        companyId: string;
        iat: number;
        exp: number;
      };
      req.userId = user.id;
      req.companyId = user.companyId;
      next();
    });
  } catch (error) {
    return handleExceptionErrorResponse(
      "authenticate JWT Middleware",
      error,
      res
    );
  }
}

async function verifyAdminPrivilagesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    // @ts-ignore
    const user = await findUserByToken(token);

    if (user?.role != "Admin") {
      return handleBadResponse(
        403,
        "Only admins can access this resource. Please speak with your company administrator if you understand you should have access.",
        res
      );
    }

    next();
  } catch (error) {
    return handleExceptionErrorResponse(
      "verify admin privilage middleware",
      error,
      res
    );
  }
}

function generateAccessToken(userId: string, companyId: string): string {
  const user = { id: userId, companyId: companyId };
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: "2h",
  });
}

function generateRefreshToken(userId: string, companyId: string): string {
  const user = { id: userId, companyId: companyId };
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "");
}

function verifyRefreshToken(
  refreshToken: string
): [string, string] | IErrorResponse {
  let accessToken = "";
  let refreshedToken = "";

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || "",
    (err, user) => {
      if (err) {
        return buildErrorObject(403, "Token has expired.");
      }

      user = user as {
        id: string;
        companyId: string;
        iat: number;
        exp: number;
      };
      accessToken = generateAccessToken(user.id, user.companyId);
      refreshedToken = generateRefreshToken(user.id, user.companyId);
    }
  );

  return [accessToken, refreshedToken];
}

function getUserIdFromToken(token: string): string {
  const decodedToken = jwt.decode(token, { complete: true });

  if (!decodedToken) {
    return "";
  }

  const user = decodedToken.payload as {
    id: string;
    companyId: string;
    iat: number;
    exp: number;
  };
  return user.id;
}

export {
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getUserIdFromToken,
};
