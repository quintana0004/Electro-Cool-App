import prisma from "../database/prisma";
import { IJobOrder } from "../types";
import { excludeFields } from "../utils/db.utils";

async function findAllJobOrders(page: number, take: number, searchTerm: string | undefined) {
  try {
    const idSearch =
      searchTerm != undefined && typeof searchTerm != "string" ? Number(searchTerm) : undefined;
    const nameSearch = searchTerm ? searchTerm : undefined;
    const overFetchAmount = take * 2;
    const skipAmount = page * take;

    const jobOrders = await prisma.jobOrder.findMany({
      skip: skipAmount,
      take: overFetchAmount,
      where: {
        OR: [
          {
            id: idSearch,
          },
          {
            customer: {
              fullName: {
                contains: nameSearch,
              },
            },
          },
        ],
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
  upsertJobOrder,
  updateJobOrderStatus,
  deleteJobOrder,
};
