import express from "express";
import { httpDeleteDeposit, httpGetAllDeposits, httpUpsertDeposit } from "./deposits.controller";

const router = express.Router();

router.get("/", httpGetAllDeposits);

router.post("/", httpUpsertDeposit);

router.delete("/:id", httpDeleteDeposit);

export default router;