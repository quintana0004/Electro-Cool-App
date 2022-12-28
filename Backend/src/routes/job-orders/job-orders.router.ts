import express from "express";
import { multerUploadMiddleware } from "../../services/file-upload.service";
import { httpGetAllJobOrders, httpUpsertJobOrder } from "./job-orders.controller";

const router = express.Router();

router.get("/", httpGetAllJobOrders);

router.post("/", multerUploadMiddleware.single("image"), httpUpsertJobOrder);

export default router;
