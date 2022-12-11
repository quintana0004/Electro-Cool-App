import express from "express";
import { httpGetAllInvoices, httpUpsertInvoice } from "./invoices.controller";

const router = express.Router();

router.get("/", httpGetAllInvoices);

router.post("/", httpUpsertInvoice);

export default router;
