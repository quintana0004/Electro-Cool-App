import express from "express";
import {
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
} from "../../services/auth.service";
import {
  httpDeleteUser,
  httpGetAllUsers,
  httpGetUserById,
  httpUpdateUserAccess,
  httpUpdateUserProfile,
  httpUpdateUserState,
} from "./users.controller";

const router = express.Router();

router.get(
  "/",
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
  httpGetAllUsers
);

router.get("/profile", authenticateJWTMiddleWare, httpGetUserById);

router.post("/profile", authenticateJWTMiddleWare, httpUpdateUserProfile);

router.post(
  "/access",
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
  httpUpdateUserAccess
);

router.post("/updateState", authenticateJWTMiddleWare, httpUpdateUserState);

router.delete(
  "/:id",
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
  httpDeleteUser
);

export default router;
