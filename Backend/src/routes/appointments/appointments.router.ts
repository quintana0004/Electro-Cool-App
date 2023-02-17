import express from "express";
import { authenticateJWTMiddleWare } from "../../services/auth.service";
import {
  httpDeleteAppointment,
  httpGetAllAppointments,
  httpUpsertAppointment,
} from "./appointments.controller";

const router = express.Router();

router.get("/", httpGetAllAppointments);

router.post("/", httpUpsertAppointment);

router.delete("/:id", httpDeleteAppointment);

export default router;
