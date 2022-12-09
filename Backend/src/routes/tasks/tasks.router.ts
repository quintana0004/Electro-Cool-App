import express from "express";
import { httpGetAllTasks } from "./tasks.controller";

const router = express.Router();

router.get("/", httpGetAllTasks);

export default router;
