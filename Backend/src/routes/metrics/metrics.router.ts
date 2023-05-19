import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpGetCurrentWorkingVehicles,
  httpGetFinishedVehiclesToday,
  httpGetNewVehiclesReceivedToday,
  httpGetTotalAmountAppointmentsToday,
  httpGetTotalAmountCanceledToday,
  httpGetTotalAmountInDraftsToday,
  httpGetTotalAmountPaidToday,
  httpGetTotalAmountPendingToday,
  httpGetTotalAmountTasksToday,
  httpGetVehiclesInShop,
  httpGetVehiclesNotStarted,
} from "./metrics.controller";

const router = express.Router();

router.get(
  "/currentVehiclesWorking",
  authenticateJWTMiddleWare,
  httpGetCurrentWorkingVehicles
);

router.get("/vehiclesInShop", authenticateJWTMiddleWare, httpGetVehiclesInShop);

router.get(
  "/vehiclesNotStarted",
  authenticateJWTMiddleWare,
  httpGetVehiclesNotStarted
);

router.get(
  "/newVehiclesReceivedToday",
  authenticateJWTMiddleWare,
  httpGetNewVehiclesReceivedToday
);

router.get(
  "/finishedVehiclesToday",
  authenticateJWTMiddleWare,
  httpGetFinishedVehiclesToday
);

router.get(
  "/totalAmountPaidToday",
  authenticateJWTMiddleWare,
  httpGetTotalAmountPaidToday
);

router.get(
  "/totalAmountInDraftsToday",
  authenticateJWTMiddleWare,
  httpGetTotalAmountInDraftsToday
);

router.get(
  "/totalAmountPendingToday",
  authenticateJWTMiddleWare,
  httpGetTotalAmountPendingToday
);

router.get(
  "/totalAmountCanceledToday",
  authenticateJWTMiddleWare,
  httpGetTotalAmountCanceledToday
);

router.get(
  "/totalAmountAppointmentsToday",
  httpGetTotalAmountAppointmentsToday
);

router.get("/totalAmountTasksToday", httpGetTotalAmountTasksToday);

export default router;
