import { Request, Response } from "express";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetCompany(req: Request, res: Response) {
  try {
    const companyId = req.params.id;

    res.status(200).json(`Get Company ${companyId}`);
  } catch (error) {
    return handleExceptionErrorResponse("get company", error, res);
  }
}

export { httpGetCompany };
