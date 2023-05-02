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

router.get("/currentVehiclesWorking", httpGetCurrentWorkingVehicles);

router.get("/vehiclesInShop", httpGetVehiclesInShop);

router.get("/vehiclesNotStarted", httpGetVehiclesNotStarted);

router.get("/newVehiclesReceivedToday", httpGetNewVehiclesReceivedToday);

router.get("/finishedVehiclesToday", httpGetFinishedVehiclesToday);

router.get("/totalAmountPaidToday", httpGetTotalAmountPaidToday);

router.get("/totalAmountInDraftsToday", httpGetTotalAmountInDraftsToday);

router.get("/totalAmountPendingToday", httpGetTotalAmountPendingToday);

router.get("/totalAmountCanceledToday", httpGetTotalAmountCanceledToday);

router.get(
  "/totalAmountAppointmentsToday",
  httpGetTotalAmountAppointmentsToday
);

router.get("/totalAmountTasksToday", httpGetTotalAmountTasksToday);

export default router;
