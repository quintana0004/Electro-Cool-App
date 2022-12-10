import { ICustomer } from "./../../types/index.d";
import { Request, Response } from "express";
import { handleBadResponse, handleExceptionErrorResponse } from "../../utils/errors.utils";
import { upsertCustomer } from "../../models/customers.model";

async function httpGetAllCustomers(req: Request, res: Response) {
  try {
    res.status(200).json("Get All Customers");
  } catch (error) {
    return handleExceptionErrorResponse("get all customers", error, res);
  }
}

async function httpUpsertCustomer(req: Request, res: Response) {
  try {
    const customerInfo: ICustomer = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      state: req.body.state,
      city: req.body.city,
      phone: req.body.phone,
      email: req.body.email,
      companyId: req.body.companyId,
    };

    if (
      !customerInfo.firstName ||
      !customerInfo.lastName ||
      !customerInfo.addressLine1 ||
      !customerInfo.city ||
      !customerInfo.phone ||
      !customerInfo.companyId
    ) {
      return handleBadResponse(
        400,
        "Missing required fields to create customer. Please provide the following fields: firstName, lastName, addressLine1, city, phone and companyId.",
        res
      );
    }

    const upsertedCustomer = await upsertCustomer(customerInfo);
    res.status(200).json(upsertedCustomer);
  } catch (error) {
    return handleExceptionErrorResponse("upsert customer", error, res);
  }
}

export { httpGetAllCustomers, httpUpsertCustomer };