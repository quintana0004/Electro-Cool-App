import { Company } from "@prisma/client";
import { prisma } from "../database";

async function findCompanyByName(name: string): Promise<Company | null> {
  let company = null;
  try {
    company = await prisma.company.findFirst({
      where: {
        name: name,
      },
    });
  } catch (error) {
    throw error;
  }

  return company;
}

async function doesCompanyExist(name: string) : Promise<Boolean> {
  let company = await findCompanyByName(name);
  return company ? true : false;
}


export {
  findCompanyByName,
  doesCompanyExist
}