import express from "express";
import { httpLogin } from "./auth.controller";

const router = express.Router();

router.post("/login", httpLogin);

export default router;
