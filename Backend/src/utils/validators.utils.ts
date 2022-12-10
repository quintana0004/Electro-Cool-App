import { findCarById } from "../models/cars.model";
import { findCompanyById } from "../models/company.model";
import { findCustomerById } from "../models/customers.model";
import { findDespositById } from "../models/desposits.model";
import { IInvoice, IInvoiceItem } from "../types";

// --- Type Validators ---
function isValidUUID(str: string): boolean {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}

function isNumeric(value: number | string) {
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
}

// --- Entity Validators ---
async function isValidCompanyId(id: string) {
  const isValidId = isValidUUID(id);
  if (!isValidId) {
    return false;
  }

  const doesCompanyExist = await findCompanyById(id);
  if (!doesCompanyExist) {
    return false;
  }

  return true;
}

async function isValidCustomerId(id: number | string) {
  id = Number(id);
  if (!isNaN(id)) {
    return false;
  }

  const doesCustomerExist = await findCustomerById(id);
  if (!doesCustomerExist) {
    return false;
  }

  return true;
}

async function isValidCarId(id: number | string) {
  id = Number(id);
  if (!isNaN(id)) {
    return false;
  }

  const doesCarExist = await findCarById(id);
  if (!doesCarExist) {
    return false;
  }

  return true;
}

async function isValidDespositId(id: number | string) {
  id = Number(id);
  if (!isNaN(id)) {
    return false;
  }

  const doesDespositExist = await findDespositById(id);
  if (!doesDespositExist) {
    return false;
  }

  return true;
}

// --- Required Fields Validators ---
function hasRequiredInvoiceFields(invoiceInfo: IInvoice) {
  if (
    !invoiceInfo.status ||
    !invoiceInfo.totalPrice ||
    !invoiceInfo.amountPaid ||
    !invoiceInfo.amountDue ||
    !invoiceInfo.companyId ||
    !invoiceInfo.customerId ||
    !invoiceInfo.carId ||
    !invoiceInfo.invoiceItems?.length
  ) {
    return false;
  }

  return true;
}

function hasRequiredInvoiceItemFields(invoiceItemInfo: IInvoiceItem) {
  if (
    !invoiceItemInfo.description ||
    !invoiceItemInfo.quantity ||
    !invoiceItemInfo.unitPrice ||
    !invoiceItemInfo.totalPrice ||
    !invoiceItemInfo.warranty
  ) {
    return false;
  }

  return true;
}

export {
  isValidUUID,
  isNumeric,
  isValidCompanyId,
  isValidCustomerId,
  isValidCarId,
  isValidDespositId,
  hasRequiredInvoiceFields,
  hasRequiredInvoiceItemFields,
};
