import { Request, Response } from "express";
import { ICustomer, IErrorResponse } from "./../../types/index.d";

import { formatPhoneNumber, titleCase } from "../../utils/helpers";
import {
  createCustomer,
  findManyCustomersByName,
} from "../../models/customers.model";

async function httpAddCustomer(req: Request, res: Response) {
  try {
    const newCustomer: ICustomer = {
      firstName: titleCase(req.body.firstName),
      lastName: titleCase(req.body.lastName),
      fullName:
        titleCase(req.body.firstName) + " " + titleCase(req.body.lastName),
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      state: req.body.state,
      city: req.body.city,
      phone: formatPhoneNumber(req.body.phone),
      email: req.body.email,
      companyName: req.body.companyName,
    };


    if (
      !newCustomer.firstName ||
      !newCustomer.lastName ||
      !newCustomer.addressLine1 ||
      !newCustomer.city ||
      !newCustomer.phone ||
      !newCustomer.companyName
    ) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Customer is missing required fields for creation."
      };
      return res.status(error.errorCode).json({ error });
    }


    const response = await createCustomer(newCustomer);

    if ('errorCode' in response) {
      return res.status(response.errorCode).json({
        error: response
      });
    }

    return res.status(201).json(response);

  } catch (error) {
    const errorResponse: IErrorResponse = {
      errorCode: 500,
      errorMessage: "The resquest to create a customer failed. Please report this to Tech Support for further investigation."
    };
    return res.status(errorResponse.errorCode).json({
      error: errorResponse
    });
  }  
}

async function httpGetCustomersByName(req: Request, res: Response) {
  try {
    
    let customerNameParam = req.query.customerName?.toString();    
    if (!customerNameParam) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "The 'customerName' parameter is empty. Please provide 'customerName' in request."
      };
      return res.status(error.errorCode).json({ error });
    }
    
    const customerName = titleCase(customerNameParam);    
    const customers = await findManyCustomersByName(customerName);
    return res.status(200).json(customers);

  } catch (error) {
    const errorResponse: IErrorResponse = {
      errorCode: 500,
      errorMessage: "The resquest to find customers by name failed. Please report this to Tech Support for further investigation."
    };
    return res.status(errorResponse.errorCode).json({
      error: errorResponse
    });
  }
}

export { 
  httpAddCustomer, 
  httpGetCustomersByName
}
