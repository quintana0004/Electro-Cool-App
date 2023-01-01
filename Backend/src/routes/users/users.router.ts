import express from "express";
import { httpDeleteUser, httpGetAllUsers, httpUpdateUserAccess } from "./users.controller";

const router = express.Router();

router.get("/", httpGetAllUsers);

router.post("/access", httpUpdateUserAccess);

router.delete("/:id", httpDeleteUser);

export default router;
