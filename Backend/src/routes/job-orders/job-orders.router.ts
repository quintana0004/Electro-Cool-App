import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import { multerUploadMiddleware } from "../../services/file-upload.service";
import {
  httpDeleteJobOrder,
  httpGetAllJobOrders,
  httpGetJobOrder,
  httpUpsertJobOrder,
} from "./job-orders.controller";

const router = express.Router();

router.get("/", httpGetAllJobOrders);

router.get("/:id", httpGetJobOrder);

router.post("/", multerUploadMiddleware.single("image"), httpUpsertJobOrder);

router.delete("/:id", httpDeleteJobOrder);

export default router;
