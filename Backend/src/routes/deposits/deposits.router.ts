import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteDeposit,
  httpGetAllDeposits,
  httpGetDepoist,
  httpGetDepositsByInvoiceId,
  httpUpsertDeposit,
} from "./deposits.controller";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, httpGetAllDeposits);

router.get(
  "/invoice/:invoiceId",
  authenticateJWTMiddleWare,
  httpGetDepositsByInvoiceId
);

router.get("/:id", authenticateJWTMiddleWare, httpGetDepoist);

router.post("/", authenticateJWTMiddleWare, httpUpsertDeposit);

router.delete("/:id", authenticateJWTMiddleWare, httpDeleteDeposit);

export default router;
