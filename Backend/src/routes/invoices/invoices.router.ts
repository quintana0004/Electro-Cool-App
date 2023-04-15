import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteInvoice,
  httpGetAllInvoices,
  httpGetInvoice,
  httpGetInvoicesByCustomer,
  httpUpsertInvoice,
} from "./invoices.controller";

const router = express.Router();

router.get("/", httpGetAllInvoices);

router.get("/customer", httpGetInvoicesByCustomer);

router.get("/:id", httpGetInvoice);

router.post("/", httpUpsertInvoice);

router.delete("/:id", httpDeleteInvoice);

export default router;
