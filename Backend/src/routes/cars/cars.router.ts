import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import { httpGetAllCars, httpGetCarsByCustomer, httpUpsertCar } from "./cars.controller";

const router = express.Router();

router.get("/", httpGetAllCars);

router.get("/customer", httpGetCarsByCustomer);

router.post("/", httpUpsertCar);

export default router;
