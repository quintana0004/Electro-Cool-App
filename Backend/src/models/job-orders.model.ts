import { Customer, JobOrder } from "@prisma/client";
import prisma from "../database/prisma";

async function findAllJobOrders(
  take: number,
  skip: number
): Promise<JobOrder[]> {
  try {
    const jobOrders = await prisma.jobOrder.findMany({ skip, take });
    return jobOrders;
  } catch (error) {
    throw error;
  }
}

export { findAllJobOrders };
