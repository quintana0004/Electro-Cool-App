import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteDeposit,
  httpGetAllDeposits,
  httpGetDepoist,
  httpUpsertDeposit,
} from "./deposits.controller";

const router = express.Router();

router.get("/", httpGetAllDeposits);

router.get("/:id", httpGetDepoist);

router.post("/", httpUpsertDeposit);

router.delete("/:id", httpDeleteDeposit);

export default router;
