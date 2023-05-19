import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteInvoice,
  httpGetAllInvoices,
  httpGetAllPendingInvoices,
  httpGetInvoice,
  httpGetInvoicesByCustomer,
  httpUpsertInvoice,
} from "./invoices.controller";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, httpGetAllInvoices);

router.get("/customer", authenticateJWTMiddleWare, httpGetInvoicesByCustomer);

router.get("/pending", authenticateJWTMiddleWare, httpGetAllPendingInvoices);

router.get("/:id", authenticateJWTMiddleWare, httpGetInvoice);

router.post("/", authenticateJWTMiddleWare, httpUpsertInvoice);

router.delete("/:id", authenticateJWTMiddleWare, httpDeleteInvoice);

export default router;
