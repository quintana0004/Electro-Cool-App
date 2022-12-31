import express from "express";
import { httpGetAllUsers } from "./users.controller";

const router = express.Router();

router.get("/", httpGetAllUsers);

router.post("/");

export default router;
