import prisma from "../database/prisma";
import { ICompany } from "./../types/index.d";

async function createCompany(companyInfo: ICompany) {
  try {
    const company = await prisma.company.create({
      data: {
        name: companyInfo.name,
        businessType: companyInfo.businessType,
        addressLine1: companyInfo.addressLine1,
        addressLine2: companyInfo.addressLine2,
        country: companyInfo.country,
        state: companyInfo.state,
        city: companyInfo.city,
        zipcode: companyInfo.zipcode,
        email: companyInfo.email,
        phone: companyInfo.phone,
      },
    });

    return company;
  } catch (error) {
    throw error;
  }
}

async function findCompanyById(id: string) {
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: id,
      },
    });

    return company;
  } catch (error) {
    throw error;
  }
}

async function findCompanyByName(name: string) {
  try {
    const company = await prisma.company.findUnique({
      where: {
        name: name,
      },
    });

    return company;
  } catch (error) {
    throw error;
  }
}

export { createCompany, findCompanyById, findCompanyByName };
