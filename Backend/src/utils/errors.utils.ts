import { Response } from "express";

import { IErrorResponse } from "../types";
import { errorLogger } from "./logger.utils";

function handleBadResponse(statusCode: number, message: string, res: Response): Response {
  const errorResponse: IErrorResponse = {
    errorCode: statusCode,
    errorMessage: message,
  };
  return res.status(errorResponse.errorCode).json({ error: errorResponse });
}

function handleExceptionErrorResponse(failedAt: string, error: any, res: Response): Response {
  errorLogger(error);
  const errorResponse: IErrorResponse = {
    errorCode: 500,
    errorMessage: `The resquest to ${failedAt} failed. Please report this to Tech Support for further investigation.`,
  };
  return res.status(errorResponse.errorCode).json({
    error: errorResponse,
  });
}

function buildErrorObject(code: number, message: string): IErrorResponse {
  const error: IErrorResponse = {
    errorCode: code,
    errorMessage: message,
  };
  return error;
}

export { handleBadResponse, handleExceptionErrorResponse, buildErrorObject };
