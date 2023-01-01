import express from "express";
import {
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
} from "../../services/auth.service";
import {
  httpDeleteUser,
  httpGetAllUsers,
  httpUpdateUserAccess,
  httpUpdateUserProfile,
} from "./users.controller";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, verifyAdminPrivilagesMiddleware, httpGetAllUsers);

router.post("/profile", authenticateJWTMiddleWare, httpUpdateUserProfile);

router.post(
  "/access",
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
  httpUpdateUserAccess
);

router.delete("/:id", authenticateJWTMiddleWare, verifyAdminPrivilagesMiddleware, httpDeleteUser);

export default router;
