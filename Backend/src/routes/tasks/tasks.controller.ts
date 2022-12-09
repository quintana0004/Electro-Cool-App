import { Request, Response } from "express";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetAllTasks(req: Request, res: Response) {
  try {
    res.status(200).json("Get All Tasks");
  } catch (error) {
    return handleExceptionErrorResponse("get all tasks", error, res);
  }
}

export { httpGetAllTasks };
