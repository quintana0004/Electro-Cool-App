import { Request, Response } from "express";

import { ICustomer } from "./../../types/index.d";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";
import {
  upsertCustomer,
  findAllCustomers,
  findAllCustomersWithActiveJobOrders,
  findCustomerById,
  deleteCustomer,
} from "../../models/customers.model";
import {
  hasRequiredCustomerFields,
  isValidCompanyId,
  isValidCustomerId,
  isValidPhoneNumber,
} from "../../utils/validators.utils";
import { getDummyCompanyId } from "../../utils/db.utils";
import { formatName, formatPhoneNumber } from "../../utils/formatters.utils";

async function httpGetAllCustomers(req: Request, res: Response) {
  try {
    let page = req.query.page ? +req.query.page : 0;
    let take = req.query.take ? +req.query.take : 0;
    let searchTerm = req.query.searchTerm
      ? req.query.searchTerm.toString()
      : "";
    let isActiveJobs = req.query.isActiveJobs;

    let customers = null;
    if (!!isActiveJobs) {
      customers = await findAllCustomersWithActiveJobOrders(
        page,
        take,
        searchTerm
      );
    } else {
      customers = await findAllCustomers(page, take, searchTerm);
    }

    return res.status(200).json(customers);
  } catch (error) {
    return handleExceptionErrorResponse("get all customers", error, res);
  }
}

async function httpGetCustomerById(req: Request, res: Response) {
  try {
    const customerId = req.params.id;

    let isCustomerIdValid = await isValidCustomerId(customerId);
    if (!isCustomerIdValid) {
      return handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const customer = await findCustomerById(+customerId);
    return res.status(200).json(customer);
  } catch (error) {
    return handleExceptionErrorResponse("get customer by id", error, res);
  }
}

async function httpUpsertCustomer(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    const customerInfo: ICustomer = {
      id: req.body.id,
      firstName: formatName(req.body.firstName),
      lastName: formatName(req.body.lastName),
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      state: req.body.state,
      city: req.body.city,
      phone: formatPhoneNumber(req.body.phone),
      email: req.body.email,
      companyId: companyId,
    };

    const hasRequiredFields = hasRequiredCustomerFields(customerInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update customer. Please provide the following fields: firstName, lastName, addressLine1, city, phone and companyId.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(customerInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isPhoneNumberFormatValid = isValidPhoneNumber(customerInfo.phone);
    if (!isPhoneNumberFormatValid) {
      return handleBadResponse(
        400,
        "The phone number provided is not valid. Please provide a phone number with 10 digits.",
        res
      );
    }

    const upsertedCustomer = await upsertCustomer(customerInfo);
    return res.status(200).json(upsertedCustomer);
  } catch (error) {
    return handleExceptionErrorResponse("upsert customer", error, res);
  }
}

async function httpDeleteCustomer(req: Request, res: Response) {
  try {
    const customerId = req.params.id;

    let isCustomerIdValid = await isValidCustomerId(customerId);
    if (!isCustomerIdValid) {
      return handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const customer = await deleteCustomer(+customerId);
    return res.status(200).json(customer);
  } catch (error) {
    return handleExceptionErrorResponse("delete customer by id", error, res);
  }
}

export {
  httpGetAllCustomers,
  httpGetCustomerById,
  httpUpsertCustomer,
  httpDeleteCustomer,
};
