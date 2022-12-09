import express from "express";
import { httpGetAllCustomers } from "./customers.controller";

const router = express.Router();

router.get("/", httpGetAllCustomers);

export default router;
