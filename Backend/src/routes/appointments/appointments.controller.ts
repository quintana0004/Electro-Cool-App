import { Request, Response } from "express";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetAllAppointments(req: Request, res: Response) {
  try {
    res.status(200).json("Get All Appointments");
  } catch (error) {
    return handleExceptionErrorResponse("get all appointments", error, res);
  }
}

export { httpGetAllAppointments };
