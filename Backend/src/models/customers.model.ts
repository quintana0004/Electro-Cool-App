import prisma from "../database/prisma";
import { ICustomer } from "./../types/index.d";

async function findAllCustomers(
  skip: number | undefined,
  take: number | undefined,
  searchTerm: string
) {
  try {
    const term = searchTerm ? searchTerm : undefined;
    const customers = await prisma.customer.findMany({
      skip,
      take,
      where: {
        phone: {
          contains: term,
        },
        fullName: {
          contains: term,
        },
      },
    });

    return customers;
  } catch (error) {
    throw error;
  }
}

async function findAllCustomersWithActiveJobOrders(
  skip: number | undefined,
  take: number | undefined,
  searchTerm: string
) {
  try {
    const term = searchTerm ? searchTerm : undefined;
    const customers = await prisma.customer.findMany({
      skip,
      take,
      where: {
        phone: {
          contains: term,
        },
        fullName: {
          contains: term,
        },
        jobOrders: {
          some: {
            status: {
              in: ["Complete", "New", "Working"],
            },
          },
        },
      },
    });

    return customers;
  } catch (error) {
    throw error;
  }
}

async function findCustomerById(id: number) {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    return customer;
  } catch (error) {
    throw error;
  }
}

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

async function deleteCustomer(id: number) {
  try {
    const customer = await prisma.customer.delete({
      where: {
        id: id,
      },
    });

    return customer;
  } catch (error) {
    throw error;
  }
}

export {
  findCustomerById,
  findAllCustomers,
  findAllCustomersWithActiveJobOrders,
  upsertCustomer,
  deleteCustomer,
};
