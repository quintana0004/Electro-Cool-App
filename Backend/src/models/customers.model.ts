import { Customer } from "@prisma/client";
import { prisma } from "../database";

import { ICustomer, IErrorResponse } from "../types";
import { findCompanyByName } from "./company.model";

async function createCustomer(
  customer: ICustomer
): Promise<Customer | IErrorResponse> {
  try {

    const company = await findCompanyByName(customer.companyName);
    if (!company) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "The company name was not found in the system. Please assure you pass a valid company name.",
      };
      return error;
    }

    const existingCustomer = await findCustomerByNameAndPhone(
      customer.fullName,
      customer.phone
    );
    if (existingCustomer) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "A Customer with this Name and Phone Number already exists. Please provide another Name or Phone Number.",
      };
      return error;
    }

    const createdCustomer = await prisma.customer.create({
      data: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        fullName: customer.fullName,
        addressLine1: customer.addressLine1,
        addressLine2: customer.addressLine2,
        state: customer.state,
        city: customer.city,
        phone: customer.phone,
        email: customer.email,
        companyId: company.id,
      },
    });

    const createdCustomerWithoutId = exclude(createdCustomer, "id", "companyId");
    return createdCustomerWithoutId;

  } catch (error) {
    throw error;
  }
}

async function findCustomerByNameAndPhone(
  name: string,
  phone: string
): Promise<Customer | null> {
  try {

    const customer = await prisma.customer.findFirst({
      where: {
        fullName: name,
        phone: phone,
      },
    });
    
    return customer;

  } catch (error) {
    throw error;
  }
}

async function findManyCustomersByName(name: string): Promise<Customer[]> {
  try {
    let customersWithId = await prisma.customer.findMany({
      where: {
        fullName: {
          contains: name,
        },
      },
    });

    const customers = customersWithId.map((c) => exclude(c, "id", "companyId"));
    return customers;

  } catch (error) {
    throw error;
  }
}

function exclude<Customer, Key extends keyof Customer>(
  customer: Customer,
  ...keys: Key[]
): Customer {
  for (let key of keys) {
    delete customer[key];
  }
  return customer;
}

export { 
  createCustomer, 
  findCustomerByNameAndPhone, 
  findManyCustomersByName 
};
