import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import { httpDeleteDeposit, httpGetAllDeposits, httpUpsertDeposit } from "./deposits.controller";

const router = express.Router();

router.get("/", httpGetAllDeposits);

router.post("/", authenticateJWTMiddleWare, httpUpsertDeposit);

router.delete("/:id", authenticateJWTMiddleWare, httpDeleteDeposit);

export default router;
