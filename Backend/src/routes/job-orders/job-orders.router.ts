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

router.get("/", authenticateJWTMiddleWare, httpGetAllJobOrders);

router.get("/:id", authenticateJWTMiddleWare, httpGetJobOrder);

router.post("/", authenticateJWTMiddleWare, httpUpsertJobOrder);

router.post("/transaction", authenticateJWTMiddleWare, httpJobOrderTransaction);

router.post("/status", authenticateJWTMiddleWare, httpUpdateJobOrderStatus);

router.delete("/:id", authenticateJWTMiddleWare, httpDeleteJobOrder);

export default router;
