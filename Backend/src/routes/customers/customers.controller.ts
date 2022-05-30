import { Request, Response } from "express";
import { ICustomer } from "./../../types/index.d";

import { formatPhoneNumber, titleCase } from "../../utils/helpers";
import {
  createCustomer,
  doesCustomerExist,
  findManyCustomersByName,
} from "../../models/customers.model";
import { doesCompanyExist } from "../../models/company.model";


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
      companyId: req.body.companyName,
    };

    // Validate all required fields are received
    if (
      !newCustomer.firstName ||
      !newCustomer.lastName ||
      !newCustomer.addressLine1 ||
      !newCustomer.city ||
      !newCustomer.phone ||
      !newCustomer.companyId
    ) {
      return res.status(400).json({
        error: "Customer does not have all required fields to be created.",
      });
    }

    // Validate that user doesn't already exist
    const customerExists = await doesCustomerExist(
      newCustomer.fullName,
      newCustomer.phone
    );    
    if (customerExists) {
      return res.status(400).json({
        error: "Customer already exists.",
      });
    }

    // Validate that company exists
    const companyExists = await doesCompanyExist(newCustomer.companyId);
    if (!companyExists) {
      return res.status(400).json({
        error: "Company with that name doesn't exist.",
      });
    }


    const createdCustomer = await createCustomer(newCustomer);
    return res.status(201).json({
      firstName: createdCustomer.firstName,
      lastName: createdCustomer.lastName,
      addressLine1: createdCustomer.addressLine1,
      addressLine2: createdCustomer.addressLine2,
      state: createdCustomer.state,
      city: createdCustomer.city,
      phone: createdCustomer.phone,
      email: createdCustomer.email,
      createdAt: createdCustomer.createdAt,
      updatedAt: createdCustomer.updatedAt
    });
    
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.toString();
    } 
    
    return res.status(500).json({
      error: errorMessage
    });
  }
  
}

async function httpGetCustomersByName(req: Request, res: Response) {

  try {
    
    // Validate customer name is valid
    let customerNameParam = req.query.customerName?.toString();    
    if (!customerNameParam) {
      return res.status(400).json({
        error: "Customer Name Parameter cannot be empty.",
      });
    }
    
    const customerName = titleCase(customerNameParam);    
    const customers = await findManyCustomersByName(customerName);
    return res.status(200).json(customers);
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.toString();
    }

    return res.status(500).json({
      error: errorMessage,
    });
  }

}

export { 
  httpAddCustomer, 
  httpGetCustomersByName
}
