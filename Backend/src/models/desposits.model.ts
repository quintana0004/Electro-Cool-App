import prisma from "../database/prisma";

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

export { findDespositById };
