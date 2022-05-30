import express from "express";
import { httpAddCustomer, httpGetCustomersByName } from "./customers.controller";

const router = express.Router();

router.get("/search", httpGetCustomersByName);

router.post("/", httpAddCustomer);


export default router;