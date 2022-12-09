import express from "express";
import { httpGetAllCars } from "./cars.controller";

const router = express.Router();

router.get("/", httpGetAllCars);

export default router;
