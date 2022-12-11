import express from "express";
import { httpGetAllDeposits, httpUpsertDeposit } from "./deposits.controller";

const router = express.Router();

router.get("/", httpGetAllDeposits);

router.post("/", httpUpsertDeposit);

export default router;
