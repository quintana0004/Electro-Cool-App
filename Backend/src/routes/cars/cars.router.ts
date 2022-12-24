import express from "express";
import {
  httpGetAllCars,
  httpGetCarsByCustomer,
  httpUpsertCar,
} from "./cars.controller";

const router = express.Router();

router.get("/", httpGetAllCars);

router.get("/customer", httpGetCarsByCustomer);

router.post("/", httpUpsertCar);

export default router;
