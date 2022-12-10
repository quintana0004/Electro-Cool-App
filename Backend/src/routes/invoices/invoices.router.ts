import express from "express";
import { httpGetAllInvoices, httpUpsertInvoices } from "./invoices.controller";

const router = express.Router();

router.get("/", httpGetAllInvoices);

router.post("/", httpUpsertInvoices);

export default router;
