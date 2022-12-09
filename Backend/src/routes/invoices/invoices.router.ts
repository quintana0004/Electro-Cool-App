import express from "express";
import { httpGetAllInvoices } from "./invoices.controller";

const router = express.Router();

router.get("/", httpGetAllInvoices);

export default router;
