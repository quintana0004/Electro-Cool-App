import prisma from "../database/prisma";

import { ICustomer } from "./../types/index.d";

async function upsertCustomer(customerInfo: ICustomer) {
  try {
    const fullName = `${customerInfo.firstName} ${customerInfo.lastName}`;
    const customer = await prisma.customer.upsert({
      where: {
        id: customerInfo?.id ?? -1,
      },
      create: {
        fullName: fullName,
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
        fullName: fullName,
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
async function findAllCustomers(skip: number, take: number, searchTerm: string) {
  try {
    const name = searchTerm ? searchTerm : undefined;
    const customers = await prisma.customer.findMany({
      skip,
      take,
      where: {
        fullName: {
          contains: name,
        },
      },
    });

    return customers;
  } catch (error) {
    throw error;
  }
}

export { upsertCustomer, findAllCustomers };
