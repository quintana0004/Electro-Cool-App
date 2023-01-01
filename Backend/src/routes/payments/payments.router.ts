import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import { httpGetAllPayments } from "./payments.controller";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, httpGetAllPayments);

export default router;
