import { JobOrder } from "@prisma/client";
import prisma from "../database/prisma";
import { IJobOrder } from "../types";

async function findAllJobOrders(
  skip: number,
  take: number,
  searchTerm: string | undefined
): Promise<JobOrder[]> {
  try {
    const idSearch =
      searchTerm != undefined && typeof searchTerm != "string" ? Number(searchTerm) : undefined;
    const nameSearch = searchTerm ? searchTerm : undefined;

    const jobOrders = await prisma.jobOrder.findMany({
      skip,
      take,
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

    return jobOrders;
  } catch (error) {
    throw error;
  }
}

async function upsertJobOrder(jobInfo: IJobOrder) {
  try {
    const job = await prisma.jobOrder.upsert({
      where: {
        id: jobInfo?.id ?? -1,
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

export { findAllJobOrders, upsertJobOrder };
