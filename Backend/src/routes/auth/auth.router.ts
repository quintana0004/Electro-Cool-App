import express from "express";
import { httpLogin, httpSignUp } from "./auth.controller";

const router = express.Router();

router.post("/login", httpLogin);

router.post("/signup", httpSignUp);

export default router;
