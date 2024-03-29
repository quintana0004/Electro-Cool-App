import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpLogin,
  httpLogout,
  httpRefreshToken,
  httpRequestTemporaryPassword,
  httpSignUp,
} from "./auth.controller";

const router = express.Router();

router.post("/login", httpLogin);

router.post("/logout", authenticateJWTMiddleWare, httpLogout);

router.post("/signup", httpSignUp);

router.post("/refreshToken", httpRefreshToken);

router.post("/recoveryPassword", httpRequestTemporaryPassword);

export default router;
