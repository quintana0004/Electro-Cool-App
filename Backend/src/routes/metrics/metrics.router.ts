import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpGetCurrentWorkingVehicles,
  httpGetFinishedVehiclesToday,
  httpGetNewVehiclesReceivedToday,
  httpGetTotalAmountCanceledToday,
  httpGetTotalAmountInDraftsToday,
  httpGetTotalAmountPaidToday,
  httpGetTotalAmountPendingToday,
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

export default router;
