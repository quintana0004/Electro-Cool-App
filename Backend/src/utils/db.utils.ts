import crypto from "crypto";
import { createCompany, findCompanyByName } from "../models/company.model";
import { ICompany } from "../types";

function excludeFields<T, Key extends keyof T>(record: T, ...keys: Key[]): T {
  for (let key of keys) {
    delete record[key];
  }
  return record;
}

function generateSalt(length: number): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0.16);
}

function sha512(password: string, salt: string) {
  let HMAC = crypto.createHmac("sha256", salt);
  HMAC.update(password);
  let hashedPassword = HMAC.digest("hex");
  return hashedPassword;
}

function generateRandomString(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{}|;:,.<>/?";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }
  return result;
}

function generateExpirationDate(hours: number) {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + hours);
  return currentDate;
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

async function getDummyCompanyId(): Promise<string> {
  let company = await findCompanyByName("Electro Cool");
  return company?.id ?? "";
}

export {
  excludeFields,
  generateSalt,
  sha512,
  generateRandomString,
  generateExpirationDate,
  createDummyCompany,
  getDummyCompanyId,
};
