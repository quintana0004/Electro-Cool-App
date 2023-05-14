import prisma from "../database/prisma";
import { ICar, ICustomer, IJobOrder } from "../types";
import { excludeFields } from "../utils/db.utils";
import { isNumeric } from "../utils/validators.utils";

async function findAllJobOrders(
  page: number,
  take: number,
  searchTerm: string | undefined
) {
  try {
    const idSearch =
      searchTerm != undefined && isNumeric(searchTerm)
        ? Number(searchTerm)
        : undefined;
    const nameSearch = searchTerm ? searchTerm : undefined;
    const overFetchAmount = take * 2;
    const skipAmount = page * take;

    const jobOrders = await prisma.jobOrder.findMany({
      skip: skipAmount,
      take: overFetchAmount,
      orderBy: {
        id: "desc",
      },
      where: {
        OR: [
          {
            id: idSearch,
          },
          {
            customer: {
              fullName: {
                contains: nameSearch,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const jobOrdersData = {
      data: jobOrders.slice(0, take),
      isLastPage: jobOrders.length <= take,
      currentPage: page,
    };
    return jobOrdersData;
  } catch (error) {
    throw error;
  }
}

async function findJobOrderById(id: number) {
  try {
    const jobOrder = await prisma.jobOrder.findUnique({
      where: {
        id: id,
      },
    });

    if (!jobOrder) {
      return null;
    }

    return jobOrder;
  } catch (error) {
    throw error;
  }
}

async function findJobOrderWithChildsById(id: number) {
  try {
    const jobOrder = await prisma.jobOrder.findUnique({
      where: {
        id: id,
      },
      include: {
        customer: true,
        car: true,
      },
    });

    if (!jobOrder) {
      return null;
    }

    return excludeFields(jobOrder, "customerId", "carId");
  } catch (error) {
    throw error;
  }
}

async function findAllCurrentWorkingVehicles() {
  try {
    const jobOrders = await prisma.jobOrder.findMany({
      where: {
        status: "Working",
      },
    });

    return jobOrders.length;
  } catch (error) {
    throw error;
  }
}

async function findAllVehiclesInShop() {
  try {
    const jobOrders = await prisma.jobOrder.findMany({
      where: {
        OR: [
          {
            status: "Working",
          },
          {
            status: "New",
          },
        ],
      },
    });

    return jobOrders.length;
  } catch (error) {
    throw error;
  }
}

async function findAllVehiclesNotStarted() {
  try {
    const jobOrders = await prisma.jobOrder.findMany({
      where: {
        status: "New",
      },
    });

    return jobOrders.length;
  } catch (error) {
    throw error;
  }
}

async function findAllNewVehiclesToday() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const jobOrders = await prisma.jobOrder.findMany({
      where: {
        status: "New",
        createdDate: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    return jobOrders.length;
  } catch (error) {
    throw error;
  }
}

async function findAllFinishedVehiclesToday() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const jobOrders = await prisma.jobOrder.findMany({
      where: {
        status: "Complete",
        lastModified: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    return jobOrders.length;
  } catch (error) {
    throw error;
  }
}

async function jobOrderTransaction(
  jobInfo: IJobOrder,
  customerInfo: ICustomer,
  carInfo: ICar
) {
  try {
    const fullName = `${customerInfo.firstName} ${customerInfo.lastName}`;

    const customerCreate = prisma.customer.create({
      data: {
        id: customerInfo?.id ?? -1,
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
    });

    const carCreate = prisma.car.create({
      data: {
        id: carInfo?.id ?? -1,
        brand: carInfo.brand,
        licensePlate: carInfo.licensePlate,
        model: carInfo.model,
        year: carInfo.year,
        mileage: carInfo.mileage,
        color: carInfo.color,
        vinNumber: carInfo.vinNumber,
        carHasItems: carInfo.carHasItems,
        carItemsDescription: carInfo.carItemsDescription,
        companyId: carInfo.companyId,
        customerId: Number(carInfo.customerId),
      },
    });

    const jobOrderCreate = prisma.jobOrder.create({
      data: {
        id: jobInfo?.id ? Number(jobInfo.id) : -1,
        requestedService: jobInfo.requestedService,
        serviceDetails: jobInfo.serviceDetails,
        status: jobInfo.status,
        jobLoadType: jobInfo.jobLoadType,
        policySignature: jobInfo.policySignature,
        carId: Number(jobInfo.carId),
        customerId: Number(jobInfo.customerId),
        companyId: jobInfo.companyId,
      },
    });

    const [customer, car, job] = await prisma.$transaction([
      customerCreate,
      carCreate,
      jobOrderCreate,
    ]);

    return { customer, car, job };
  } catch (error) {
    throw error;
  }
}

async function upsertJobOrder(jobInfo: IJobOrder) {
  try {
    const job = await prisma.jobOrder.upsert({
      where: {
        id: jobInfo?.id ? Number(jobInfo.id) : -1,
      },
      create: {
        requestedService: jobInfo.requestedService,
        serviceDetails: jobInfo.serviceDetails,
        status: jobInfo.status,
        jobLoadType: jobInfo.jobLoadType,
        policySignature: jobInfo.policySignature,
        carId: Number(jobInfo.carId),
        customerId: Number(jobInfo.customerId),
        companyId: jobInfo.companyId,
      },
      update: {
        requestedService: jobInfo.requestedService,
        serviceDetails: jobInfo.serviceDetails,
        status: jobInfo.status,
        jobLoadType: jobInfo.jobLoadType,
        policySignature: jobInfo.policySignature,
        carId: Number(jobInfo.carId),
        customerId: Number(jobInfo.customerId),
        companyId: jobInfo.companyId,
        lastModified: new Date(),
      },
    });

    return job;
  } catch (error) {
    throw error;
  }
}

async function updateJobOrderStatus(id: string | number, status: string) {
  try {
    const jobOrder = await prisma.jobOrder.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
    });

    return jobOrder;
  } catch (error) {
    throw error;
  }
}

async function deleteJobOrder(id: number) {
  try {
    const jobOrder = await prisma.jobOrder.delete({
      where: {
        id: id,
      },
    });

    return jobOrder;
  } catch (error) {
    throw error;
  }
}

export {
  findAllJobOrders,
  findJobOrderById,
  findJobOrderWithChildsById,
  findAllCurrentWorkingVehicles,
  findAllVehiclesInShop,
  findAllVehiclesNotStarted,
  findAllNewVehiclesToday,
  findAllFinishedVehiclesToday,
  upsertJobOrder,
  jobOrderTransaction,
  updateJobOrderStatus,
  deleteJobOrder,
};
