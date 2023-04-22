import express from "express";
import { httpCreateTask, httpDeleteTask, httpGetAllTasks } from "./tasks.controller";

const router = express.Router();

router.get("/", httpGetAllTasks);

router.post("/", httpCreateTask);

router.delete("/:id", httpDeleteTask);

export default router;
