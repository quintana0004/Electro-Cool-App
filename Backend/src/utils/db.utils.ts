import { createCompany, findCompanyByName } from "../models/company.model";
import { ICompany } from "../types";

function isValidUUID(str: string): boolean {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}

function excludeFields<T, Key extends keyof T>(record: T, ...keys: Key[]): T {
  for (let key of keys) {
    delete record[key];
  }
  return record;
}

async function createDummyCompany() {
  const existingCompany = await findCompanyByName("Electro Cool");
  if (existingCompany == null) {
    console.log("Company does not exist, creating dummy Electro Cool Company.");
    const companyInfo: ICompany = {
      name: "Electro Cool",
      businessType: "Exotic Motor Sports",
      addressLine1: "Av. Orquídea",
      addressLine2: "Casa de Juan",
      country: "Bayamon",
      state: "PR",
      city: "Parque Valencia",
      zipcode: "00959",
      email: "jmontalvo@cobaltopr.com",
      phone: "7877101074",
    };

    await createCompany(companyInfo);
  }
}

function isNumeric(value: number) {
  return !isNaN(value) && isFinite(value);
}

export { isValidUUID, excludeFields, createDummyCompany, isNumeric };
