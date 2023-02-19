import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteCustomer,
  httpGetAllCustomers,
  httpGetCustomerById,
  httpUpsertCustomer,
} from "./customers.controller";

const router = express.Router();

router.get("/", httpGetAllCustomers);

router.get("/:id", httpGetCustomerById);

router.post("/", httpUpsertCustomer);

router.delete("/:id", httpDeleteCustomer);

export default router;
