import { JobOrder } from "@prisma/client";
import prisma from "../database/prisma";
import { IJobOrder } from "../types";

async function findAllJobOrders(): Promise<JobOrder[]> {
  try {
    const jobOrders = await prisma.jobOrder.findMany();

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
        carId: jobInfo.carId,
        companyId: jobInfo.companyId,
        customerId: jobInfo.customerId,
      },
      update: {
        requestedService: jobInfo.requestedService,
        serviceDetails: jobInfo.serviceDetails,
        status: jobInfo.status,
        jobLoadType: jobInfo.jobLoadType,
        policySignature: jobInfo.policySignature,
        carId: jobInfo.carId,
        companyId: jobInfo.companyId,
        customerId: jobInfo.customerId,
        lastModified: new Date(),
      },
    });

    return job;
  } catch (error) {
    throw error;
  }
}

export { findAllJobOrders, upsertJobOrder };
