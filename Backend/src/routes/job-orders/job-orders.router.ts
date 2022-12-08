import express from "express";
import { httpGetAllJobOrders } from "./job-orders.controller";

const router = express.Router();

router.get("/", httpGetAllJobOrders);

export default router;
