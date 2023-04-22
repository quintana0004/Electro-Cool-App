import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteCar,
  httpGetAllCars,
  httpGetCarById,
  httpGetCarsByCustomer,
  httpUpsertCar,
} from "./cars.controller";

const router = express.Router();

router.get("/", httpGetAllCars);

router.get("/customer", httpGetCarsByCustomer);

router.get("/:id", httpGetCarById);

router.post("/", httpUpsertCar);

router.delete("/:id", httpDeleteCar);

export default router;
