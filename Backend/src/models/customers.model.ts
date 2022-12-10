import { ICustomer } from "./../types/index.d";
import prisma from "../database/prisma";
import { Customer } from "@prisma/client";
import { StringifyOptions } from "querystring";

async function upsertCustomer(customerInfo: ICustomer) {
  try {
    const customer = await prisma.customer.upsert({
      where: {
        id: customerInfo?.id ?? -1,
      },
      create: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        addressLine1: customerInfo.addressLine1,
        addressLine2: customerInfo.addressLine2,
        state: customerInfo.state,
        city: customerInfo.city,
        phone: customerInfo.phone,
        email: customerInfo.email,
        companyId: customerInfo.companyId,
      },
      update: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        addressLine1: customerInfo.addressLine1,
        addressLine2: customerInfo.addressLine2,
        state: customerInfo.state,
        city: customerInfo.city,
        phone: customerInfo.phone,
        email: customerInfo.email,
        lastModified: new Date(),
      },
    });

    return customer;
  } catch (error) {
    throw error;
  }
}
async function findAllCustomerName(
  skip: number,
  take: number,
  firstname: string,
  lastname: string
) {
  try {
    const customerNames = await prisma.customer.findMany({
      skip,
      take,
      where: {
        firstName: firstname
          ? firstname
          : undefined && lastname
          ? lastname
          : undefined,
      },
    });
    return customerNames;
  } catch (error) {
    throw error;
  }
}

export { upsertCustomer };
export { findAllCustomerName };
