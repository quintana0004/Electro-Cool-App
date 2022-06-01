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

function exclude<Company, Key extends keyof Company>(
  company: Company,
  ...keys: Key[]
): Company {
  for (let key of keys) {
    delete company[key]
  }
  return company
}

export {
  findCompanyByName
}