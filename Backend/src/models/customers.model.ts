import { Customer } from "@prisma/client";
import { prisma } from "../database";

import { ICustomer } from "../types";
import { findCompanyByName } from "./company.model";


async function doesCustomerExist(
  name: string,
  phone: string
): Promise<Boolean> {

  let customer = await findCustomerByNameAndPhone(name, phone);
  return customer ? true : false;

}

async function createCustomer(customer: ICustomer): Promise<Customer> {
  try {
    const company = await findCompanyByName(customer.companyId);

    if (!company) throw new Error("Company does not exist");

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

    return createdCustomer;
  } catch (error) {
    throw error;
  }
}

async function findCustomerByNameAndPhone(
  name: string,
  phone: string
): Promise<Customer | null> {
  let customer = null;

  try {
    customer = await prisma.customer.findFirst({
      where: {
        fullName: name,
        phone: phone,
      },
    });
  } catch (error) {
    throw error;
  }

  return customer;
}

async function findManyCustomersByName(name: string): Promise<Customer[]> {
  let customers: Customer[] = [];

  try {    
    let customersWithId = await prisma.customer.findMany({
      where: {
        fullName: {
          contains: name
        },
      },
    });

    customers = customersWithId.map((c) => exclude(c, "id"));    
  } catch (error) {    
    throw error;
  }

  return customers;
}

function exclude<Customer, Key extends keyof Customer>(
  customer: Customer,
  ...keys: Key[]
): Customer {
  for (let key of keys) {
    delete customer[key]
  }
  return customer
}


export {
  doesCustomerExist,
  createCustomer,
  findCustomerByNameAndPhone,
  findManyCustomersByName
}

