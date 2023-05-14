import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteJobOrder,
  httpGetAllJobOrders,
  httpGetJobOrder,
  httpJobOrderTransaction,
  httpUpdateJobOrderStatus,
  httpUpsertJobOrder,
} from "./job-orders.controller";

const router = express.Router();

router.get("/", httpGetAllJobOrders);

router.get("/:id", httpGetJobOrder);

router.post("/", httpUpsertJobOrder);

router.post("/transaction", httpJobOrderTransaction);

router.post("/status", httpUpdateJobOrderStatus);

router.delete("/:id", httpDeleteJobOrder);

export default router;
