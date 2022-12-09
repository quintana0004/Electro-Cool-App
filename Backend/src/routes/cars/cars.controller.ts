import { Request, Response } from "express";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetAllCars(req: Request, res: Response) {
  try {
    res.status(200).json("Get All Cars");
  } catch (error) {
    return handleExceptionErrorResponse("get all cars", error, res);
  }
}

export { httpGetAllCars };
