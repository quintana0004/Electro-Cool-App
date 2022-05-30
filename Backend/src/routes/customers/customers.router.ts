import express from "express";
import { httpAddCustomer } from "./customers.controller";

const router = express.Router();

router.post("/", httpAddCustomer);

export default router;