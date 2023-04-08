import prisma from "../database/prisma";
import { excludeFields } from "../utils/db.utils";
import { isNumeric } from "../utils/validators.utils";
import { IDeposit } from "./../types/index.d";

async function findAllDeposits(page: number, take: number, searchTerm: string | undefined) {
  try {
    const term = searchTerm ?? "";
    const idSearchTerm = isNumeric(term) ? Number(term) : undefined;
    const overFetchAmount = take * 2;
    const skipAmount = page * take;

    const deposits = await prisma.deposit.findMany({
      skip: skipAmount,
      take: overFetchAmount,
      where: {
        OR: [
          {
            customer: {
              fullName: {
                contains: term,
              },
            },
          },
          {
            id: {
              in: idSearchTerm,
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

    const depositsData = {
      data: deposits.slice(0, take),
      isLastPage: deposits.length <= take,
      currentPage: page,
    };
    return depositsData;
  } catch (error) {
    throw error;
  }
}

async function findDepositById(id: number) {
  try {
    const deposit = await prisma.deposit.findUnique({
      where: {
        id: id,
      },
    });

    return deposit;
  } catch (error) {
    throw error;
  }
}

async function findDepositWithChildsById(id: number) {
  try {
    const deposit = await prisma.deposit.findUnique({
      where: {
        id: id,
      },
      include: {
        customer: true,
        car: true,
      },
    });

    if (!deposit) {
      return null;
    }

    return excludeFields(deposit, "customerId", "carId");
  } catch (error) {
    throw error;
  }
}

async function findDepositsByInvoiceId(invoiceId: number) {
  try {
    const deposits = await prisma.deposit.findMany({
      where: {
        invoiceId: invoiceId,
      },
      include: {
        customer: {
          select: {
            fullName: true,
          }
        },
      },
    });

    return deposits;
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
        amountTotal: depositInfo.amountTotal,
        status: depositInfo.status,
        description: depositInfo.description,
        customerId: depositInfo.customerId,
        carId: depositInfo.carId,
        companyId: depositInfo.companyId,
        isAvailable: !depositInfo.invoiceId,
        invoiceId: depositInfo.invoiceId,
      },
      update: {
        amountTotal: depositInfo.amountTotal,
        status: depositInfo.status,
        description: depositInfo.description,
        customerId: depositInfo.customerId,
        carId: depositInfo.carId,
        isAvailable: !depositInfo.invoiceId,
        invoiceId: depositInfo.invoiceId,
        lastModified: new Date(),
      },
    });

    return deposit;
  } catch (error) {
    throw error;
  }
}

async function updateDepositsParentInvoice(depositIds: number[], invoiceId: number) {
  try {
    let deposits = await prisma.deposit.updateMany({
      where: {
        id: {
          in: [...depositIds],
        },
      },
      data: {
        invoiceId: invoiceId,
        isAvailable: false,
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

export {
  findAllDeposits,
  findDepositById,
  findDepositWithChildsById,
  findDepositsByInvoiceId,
  upsertDeposit,
  updateDepositsParentInvoice,
  deleteDeposit,
};
