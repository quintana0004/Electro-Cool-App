import express from "express";
import {
  httpGetAllJobOrders,
  httpUpsertJobOrder,
} from "./job-orders.controller";

const router = express.Router();

router.get("/", httpGetAllJobOrders);

router.post("/", httpUpsertJobOrder);

export default router;
