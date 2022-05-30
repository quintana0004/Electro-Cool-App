import { Customer } from "@prisma/client";
import { prisma } from "../database";

import { ICustomer } from "../types";
import { findCompanyByName } from "./company.model";

async function createCustomer(customer: ICustomer): Promise<Customer> {
  try {
    const company = await findCompanyByName(customer.companyId);

    if (!company) throw new Error("Company does not exist");

    const createdCustomer = await prisma.customer.create({
      data: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        addressLine1: customer.addressLine1,
        addressLine2: customer.addressLine2,
        state: customer.state,
        city: customer.city,
        phone: customer.phone,
        email: customer.email,
        companyId: company.id,
      },
    });

    return createdCustomer;
  } catch (error) {
    throw error;
  }
}

async function findCustomerByNameAndPhone(
  firstName: string,
  lastName: string,
  phone: string
): Promise<Customer | null> {
  let customer = null;

  try {
    customer = await prisma.customer.findFirst({
      where: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      },
    });
  } catch (error) {
    throw error;
  }

  return customer;
}

async function doesCustomerExist(
  firstName: string,
  lastName: string,
  phone: string
): Promise<Boolean> {

  let customer = await findCustomerByNameAndPhone(firstName, lastName, phone);
  return customer ? true : false;

}


export {
  createCustomer,
  findCustomerByNameAndPhone,
  doesCustomerExist
}

