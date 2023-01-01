import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import { httpGetAllCars, httpGetCarsByCustomer, httpUpsertCar } from "./cars.controller";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, httpGetAllCars);

router.get("/customer", authenticateJWTMiddleWare, httpGetCarsByCustomer);

router.post("/", authenticateJWTMiddleWare, httpUpsertCar);

export default router;
