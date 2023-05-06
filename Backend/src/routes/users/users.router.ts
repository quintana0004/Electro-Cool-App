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
<<<<<<< HEAD

router.get("/profile", authenticateJWTMiddleWare, httpGetUserById);
=======
>>>>>>> 573a2fa58d74b15b80739a980ceacf6b881c9740

router.post("/profile", authenticateJWTMiddleWare, httpUpdateUserProfile);

router.post(
  "/access",
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
  httpUpdateUserAccess
);

<<<<<<< HEAD
router.post("/updateState", authenticateJWTMiddleWare, httpUpdateUserState);

=======
>>>>>>> 573a2fa58d74b15b80739a980ceacf6b881c9740
router.delete(
  "/:id",
  authenticateJWTMiddleWare,
  verifyAdminPrivilagesMiddleware,
  httpDeleteUser
);

export default router;
