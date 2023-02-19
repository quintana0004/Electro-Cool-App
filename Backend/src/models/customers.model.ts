import prisma from "../database/prisma";
import { ICustomer } from "./../types/index.d";

async function findAllCustomers(page: number, take: number, searchTerm: string | undefined) {
  try {
    const overFetchAmount = take * 2;
    const skipAmount = page * take;

    const customers = await prisma.customer.findMany({
      skip: skipAmount,
      take: overFetchAmount,
      where: {
        OR: [
          {
            phone: {
              contains: searchTerm,
            },
          },
          {
            fullName: {
              contains: searchTerm,
            },
          },
        ],
      },
    });

    const customersData = {
      data: customers.slice(0, take),
      isLastPage: customers.length <= take,
      currentPage: page,
    };
    return customersData;
  } catch (error) {
    throw error;
  }
}

async function findAllCustomersWithActiveJobOrders(
  page: number,
  take: number,
  searchTerm: string | undefined
) {
  try {
    const overFetchAmount = take * 2;
    const skipAmount = page * take;

    const customers = await prisma.customer.findMany({
      skip: skipAmount,
      take: overFetchAmount,
      where: {
        OR: [
          {
            phone: {
              contains: searchTerm,
            },
          },
          {
            fullName: {
              contains: searchTerm,
            },
          },
          {
            jobOrders: {
              some: {
                status: {
                  in: ["Complete", "New", "Working"],
                },
              },
            },
          },
        ],
      },
    });

    const customersData = {
      data: customers.slice(0, take),
      isLastPage: customers.length <= take,
      currentPage: page,
    };
    return customersData;
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
