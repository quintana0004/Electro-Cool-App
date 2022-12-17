import express from "express";
import { httpCreateCompany, httpGetCompany } from "./company.controller";

const router = express.Router();

router.get("/:id", httpGetCompany);

router.post("/", httpCreateCompany);

export default router;
