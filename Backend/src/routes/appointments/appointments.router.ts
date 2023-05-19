import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteAppointment,
  httpGetAllAppointments,
  httpGetAppointmentById,
  httpUpsertAppointment,
} from "./appointments.controller";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, httpGetAllAppointments);

router.get("/:id", authenticateJWTMiddleWare, httpGetAppointmentById);

router.post("/", authenticateJWTMiddleWare, httpUpsertAppointment);

router.delete("/:id", authenticateJWTMiddleWare, httpDeleteAppointment);

export default router;
