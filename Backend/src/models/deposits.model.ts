import { IDeposit } from "./../types/index.d";
import prisma from "../database/prisma";
import { Deposit } from "@prisma/client";

async function findDespositById(id: number) {
  try {
    const desposit = await prisma.deposit.findUnique({
      where: {
        id: id,
      },
    });

    return desposit;
  } catch (error) {
    throw error;
  }
}

async function upsertDeposit(depositInfo: IDeposit) {
  try {
    const deposit = await prisma.deposit.upsert({
      where: {
        id: depositInfo?.id ?? -1,
      },
      create: {
        amount: depositInfo.amount,
        description: depositInfo.description,
        isAvailable: depositInfo.isAvailable,
        customerId: depositInfo.customerId,
        carId: depositInfo.carId,
        companyId: depositInfo.companyId,
      },
      update: {
        amount: depositInfo.amount,
        description: depositInfo.description,
        isAvailable: depositInfo.isAvailable,
        customerId: depositInfo.customerId,
        carId: depositInfo.carId,
        lastModified: new Date(),
      },
    });

    return deposit;
  } catch (error) {
    throw error;
  }
}

async function updateDepositsParentInvoice(
  depositIds: number[],
  invoiceId: number
) {
  try {
    let deposits = await prisma.deposit.updateMany({
      where: {
        id: {
          in: [...depositIds],
        },
      },
      data: {
        invoiceId: invoiceId,
      },
    });

    return deposits;
  } catch (error) {
    throw error;
  }
}

async function deleteDeposit(id: number) {
  try {
    const deposit = await prisma.deposit.delete({
      where: {
        id: id,
      },
    });

    return deposit;
  } catch (error) {
    throw error;
  }
}
async function findAllDeposits(
  skip: number,
  take: number,
  searchTerm: string | undefined
) {
  try {
    const name = searchTerm ? searchTerm : undefined;
    const AllDeposit = await prisma.deposit.findMany({
      skip,
      take,
      where: {
        customer: {
          fullName: {
            contains: name,
          },
        },
      },
    });
    return AllDeposit;
  } catch (error) {
    throw error;
  }
}

export {
  findDespositById,
  upsertDeposit,
  updateDepositsParentInvoice,
  deleteDeposit,
  findAllDeposits,
};
