import express from "express";
import { httpGetAllAppointments } from "./appointments.controller";

const router = express.Router();

router.get("/", httpGetAllAppointments);

export default router;
