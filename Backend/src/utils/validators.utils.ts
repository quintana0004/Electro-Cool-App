import { IJobOrder, IUser } from "./../types/index.d";
import { IInvoice, IInvoiceItem, ICar, IDeposit, IAppointment, ICustomer, ITask } from "../types";
import { findCarById } from "../models/cars.model";
import { findCompanyById } from "../models/company.model";
import { findCustomerById } from "../models/customers.model";
import { findDespositById } from "../models/deposits.model";
import { findAppointmentById } from "../models/appointments.model";
import { findTaskById } from "../models/tasks.model";
import { findUserById } from "../models/users.model";

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

function isIsoDate(str: string) {
  try {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;

    const d = new Date(str);
    return d instanceof Date && d.toISOString() === str; // valid date
  } catch (error) {
    return false;
  }
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

async function isValidUserId(id: string) {
  const isValidId = isValidUUID(id);
  if (!isValidId) {
    return false;
  }

  const doesUserExist = await findUserById(id);
  if (!doesUserExist) {
    return false;
  }

  return true;
}

async function isValidCustomerId(id: number | string) {
  id = Number(id);
  if (isNaN(id)) {
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
  if (isNaN(id)) {
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
  if (isNaN(id)) {
    return false;
  }

  const doesDespositExist = await findDespositById(id);
  if (!doesDespositExist) {
    return false;
  }

  return true;
}

async function isValidAppointmentId(id: number | string) {
  id = Number(id);
  if (isNaN(id)) {
    return false;
  }

  const doesAppointmentExist = await findAppointmentById(id);
  if (!doesAppointmentExist) {
    return false;
  }

  return true;
}

async function isValidTaskId(id: number | string) {
  id = Number(id);
  if (isNaN(id)) {
    return false;
  }

  const doesTaskExist = await findTaskById(id);
  if (!doesTaskExist) {
    return false;
  }

  return true;
}

// --- Required Fields Validators ---
function hasRequiredUserFields(userInfo: IUser) {
  if (
    !userInfo.email ||
    !userInfo.password ||
    !userInfo.firstName ||
    !userInfo.lastName ||
    !userInfo.phone ||
    !userInfo.username
  ) {
    return false;
  }

  return true;
}

function hasRequiredCustomerFields(customerInfo: ICustomer) {
  if (
    !customerInfo.firstName ||
    !customerInfo.lastName ||
    !customerInfo.addressLine1 ||
    !customerInfo.city ||
    !customerInfo.phone ||
    !isValidUUID(customerInfo.companyId)
  ) {
    return false;
  }

  return true;
}

function hasRequiredCarFields(carInfo: ICar) {
  if (
    !carInfo.brand ||
    !carInfo.licensePlate ||
    !carInfo.model ||
    !carInfo.year ||
    !carInfo.mileage ||
    !carInfo.color ||
    !carInfo.vinNumber ||
    !isValidUUID(carInfo.companyId) ||
    !isNumeric(carInfo.customerId)
  ) {
    return false;
  }

  return true;
}

function hasRequiredJobOrderFields(jobOrderInfo: IJobOrder) {
  if (
    !jobOrderInfo.requestedService ||
    !jobOrderInfo.serviceDetails ||
    !jobOrderInfo.status ||
    !jobOrderInfo.jobLoadType ||
    !jobOrderInfo.policySignature ||
    !jobOrderInfo.carId ||
    !jobOrderInfo.companyId ||
    !jobOrderInfo.customerId
  ) {
    return false;
  }

  return true;
}

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

function hasRequiredDepositFields(depositInfo: IDeposit) {
  if (
    !depositInfo.amount ||
    !depositInfo.description ||
    !depositInfo.isAvailable ||
    !depositInfo.customerId ||
    !depositInfo.carId ||
    !depositInfo.companyId
  ) {
    return false;
  }

  return true;
}

function hasRequiredAppointmentFields(appointmentInfo: IAppointment) {
  if (
    !appointmentInfo.service ||
    !appointmentInfo.description ||
    !appointmentInfo.arrivalDateTime ||
    !appointmentInfo.model ||
    !appointmentInfo.licensePlate ||
    !appointmentInfo.customerName ||
    !appointmentInfo.phone ||
    !appointmentInfo.email ||
    !appointmentInfo.companyId
  ) {
    return false;
  }

  return true;
}

function hasRequiredTaskFields(taskInfo: ITask) {
  if (!taskInfo.text || !taskInfo.dueDate || !taskInfo.companyId) {
    return false;
  }

  return true;
}

export {
  isValidUUID,
  isNumeric,
  isIsoDate,
  isValidCompanyId,
  isValidUserId,
  isValidCustomerId,
  isValidCarId,
  isValidDespositId,
  isValidAppointmentId,
  isValidTaskId,
  hasRequiredUserFields,
  hasRequiredCustomerFields,
  hasRequiredCarFields,
  hasRequiredJobOrderFields,
  hasRequiredInvoiceFields,
  hasRequiredInvoiceItemFields,
  hasRequiredDepositFields,
  hasRequiredAppointmentFields,
  hasRequiredTaskFields,
};
