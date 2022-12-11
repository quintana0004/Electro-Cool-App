import { createCompany, findCompanyByName } from "../models/company.model";
import { ICompany } from "../types";

function excludeFields<T, Key extends keyof T>(record: T, ...keys: Key[]): T {
  for (let key of keys) {
    delete record[key];
  }
  return record;
}

// --- Temporary Dummy Data Inserts ---
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

export { excludeFields, createDummyCompany };
