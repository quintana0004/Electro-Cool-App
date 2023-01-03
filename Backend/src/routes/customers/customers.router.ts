import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import { httpGetAllCustomers, httpUpsertCustomer } from "./customers.controller";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, httpGetAllCustomers);

router.post("/", authenticateJWTMiddleWare, httpUpsertCustomer);

export default router;
