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

router.get("/", authenticateJWTMiddleWare, httpGetAllCars);

router.get("/customer", authenticateJWTMiddleWare, httpGetCarsByCustomer);

router.get("/:id", authenticateJWTMiddleWare, httpGetCarById);

router.post("/", authenticateJWTMiddleWare, httpUpsertCar);

router.delete("/:id", authenticateJWTMiddleWare, httpDeleteCar);

export default router;
