import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteCustomer,
  httpGetAllCustomers,
  httpGetCustomerById,
  httpUpsertCustomer,
} from "./customers.controller";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, httpGetAllCustomers);

router.get("/:id", authenticateJWTMiddleWare, httpGetCustomerById);

router.post("/", authenticateJWTMiddleWare, httpUpsertCustomer);

router.delete("/:id", authenticateJWTMiddleWare, httpDeleteCustomer);

export default router;
