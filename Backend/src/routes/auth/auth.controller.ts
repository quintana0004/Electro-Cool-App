import { Request, Response } from "express";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpLogin(req: Request, res: Response) {
  try {
    res.status(200).json("Auth Login");
  } catch (error) {
    return handleExceptionErrorResponse("auth login controller", error, res);
  }
}

export { httpLogin };
