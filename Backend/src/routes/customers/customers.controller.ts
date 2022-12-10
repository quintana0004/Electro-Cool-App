import { Customer } from "@prisma/client";
import { ICustomer } from "./../../types/index.d";
import { Request, Response } from "express";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";
import {
  upsertCustomer,
  findAllCustomerName,
} from "../../models/customers.model";
import { isValidUUID } from "../../utils/db.utils";
import { json } from "stream/consumers";

async function httpGetAllCustomers(req: Request, res: Response) {
  try {
    let skip = req.query.skip ? +req.query.skip : 0;
    let take = req.query.take ? +req.query.take : 0;
    let Firstname = req.query.Firstname ? req.query.Firstname : "";
    let Lastname = req.query.Lastname ? req.query.Lastname : "";
    const Customer = await findAllCustomerName(
      skip,
      take,
      Firstname.toString(),
      Lastname.toString()
    );
    res.status(200).json(Customer);
  } catch (error) {
    res.status(500).json("Error in Get All Names");
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
      !isValidUUID(customerInfo.companyId)
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
