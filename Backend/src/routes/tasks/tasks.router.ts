import express from "express";
import {
  httpCreateTask,
  httpDeleteTask,
  httpGetAllTasks,
} from "./tasks.controller";
import { authenticateJWTMiddleWare } from "../../services/auth.service";

const router = express.Router();

router.get("/", authenticateJWTMiddleWare, httpGetAllTasks);

router.post("/", authenticateJWTMiddleWare, httpCreateTask);

router.delete("/:id", authenticateJWTMiddleWare, httpDeleteTask);

export default router;
