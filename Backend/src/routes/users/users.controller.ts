import { Request, Response } from "express";
import { findUserByName } from "../../models/users.model";
import { handleExceptionErrorResponse } from "../../utils/errors.utils";

async function httpGetAllUsers(req: Request, res: Response) {
  try {
    let searchTerm = req.query.searchTerm ? req.query.searchTerm.toString() : undefined;

    const users = await findUserByName(searchTerm);
    return res.json(users);
  } catch (error) {
    return handleExceptionErrorResponse("get all users", error, res);
  }
}

async function httpUpdateUserRole(req: Request, res: Response) {
  try {
    return res.json("Update User Role");
  } catch (error) {
    return handleExceptionErrorResponse("update user role", error, res);
  }
}

export { httpGetAllUsers, httpUpdateUserRole };
