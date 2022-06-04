import express from "express";
import { httpAddJobOrder } from "./joborders.controller";

const router = express.Router();

router.post("/", httpAddJobOrder);


export default router;