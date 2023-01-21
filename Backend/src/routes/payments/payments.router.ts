import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import { multerUploadMiddleware } from "../../services/file-upload.service";
import {
  httpGetAllPayments,
  httpGetPaymentById,
  httpUpsertATHMovilPayment,
  httpUpsertCardPayment,
  httpUpsertCashPayment,
  httpUpsertCheckPayment,
} from "./payments.controller";

const router = express.Router();

router.get("/", httpGetAllPayments);

router.get("/:id", httpGetPaymentById);

router.post("/card-payment", multerUploadMiddleware.single("athEvidence"), httpUpsertCardPayment);

router.post(
  "/check-payment",
  multerUploadMiddleware.fields([
    { name: "checkFrontImage", maxCount: 1 },
    { name: "checkBackImage", maxCount: 1 },
  ]),
  httpUpsertCheckPayment
);

router.post("/cash-payment", httpUpsertCashPayment);

router.post("/ath-movil-payment", httpUpsertATHMovilPayment);

export default router;
