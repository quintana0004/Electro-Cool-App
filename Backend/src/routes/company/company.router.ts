import express from "express";
import { httpGetCompany } from "./company.controller";

const router = express.Router();

router.get("/:id", httpGetCompany);

export default router;
