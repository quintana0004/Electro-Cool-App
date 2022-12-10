import express from "express";
import { httpGetAllCars, httpUpsertCar } from "./cars.controller";

const router = express.Router();

router.get("/", httpGetAllCars);

router.post("/", httpUpsertCar);

export default router;
