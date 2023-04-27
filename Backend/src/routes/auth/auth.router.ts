import express from "express";
import { httpLogin, httpRefreshToken, httpSignUp } from "./auth.controller";

const router = express.Router();

router.post("/login", httpLogin);

router.post("/signup", httpSignUp);

router.post("/refreshToken", httpRefreshToken);

export default router;
