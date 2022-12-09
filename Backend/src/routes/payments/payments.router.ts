import express from "express";
import { httpGetAllPayments } from "./payments.controller";

const router = express.Router();

router.get("/", httpGetAllPayments);

export default router;
