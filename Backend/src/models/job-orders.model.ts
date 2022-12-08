import { JobOrder } from "@prisma/client";
import prisma from "../database/prisma";

async function findAllJobOrders(): Promise<JobOrder[]> {
  try {
    const jobOrders = await prisma.jobOrder.findMany();

    return jobOrders;
  } catch (error) {
    throw error;
  }
}

export { findAllJobOrders };
