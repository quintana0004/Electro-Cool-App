import express from "express";
import { httpGetAllCustomers, httpUpsertCustomer } from "./customers.controller";

const router = express.Router();

router.get("/", httpGetAllCustomers);

router.post("/", httpUpsertCustomer);

export default router;
