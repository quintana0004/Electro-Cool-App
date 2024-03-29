import { IJobOrder, IUser } from "../types";
import {
  IInvoice,
  IInvoiceItem,
  ICar,
  IDeposit,
  IAppointment,
  ICustomer,
  ITask,
} from "../types";
import { findCarById } from "../models/cars.model";
import { findCompanyById } from "../models/company.model";
import { findCustomerById } from "../models/customers.model";
import { findDepositById } from "../models/deposits.model";
import { findAppointmentById } from "../models/appointments.model";
import { findTaskById } from "../models/tasks.model";
import { findUserById } from "../models/users.model";
import { findInvoiceById } from "../models/invoices.model";
import { findJobOrderById } from "../models/job-orders.model";

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

async function isValidJobOrderId(id: number | string) {
  id = Number(id);
  if (isNaN(id)) {
    return false;
  }

  const doesJobOrderExist = await findJobOrderById(id);
  if (!doesJobOrderExist) {
    return false;
  }

  return true;
}

async function isValidInvoiceId(id: number | string) {
  id = Number(id);
  if (isNaN(id)) {
    return false;
  }

  const doesInvoiceExist = await findInvoiceById(id);
  if (!doesInvoiceExist) {
    return false;
  }

  return true;
}

async function isValidDepositId(id: number | string) {
  id = Number(id);
  if (isNaN(id)) {
    return false;
  }

  const doesDepositExist = await findDepositById(id);
  if (!doesDepositExist) {
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

function isValidPhoneNumber(phone: string | undefined) {
  if (phone === "NaPN") {
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
    !jobOrderInfo.policySignature ||
    !jobOrderInfo.status ||
    !jobOrderInfo.jobLoadType ||
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
    (!invoiceInfo.amountTotal && invoiceInfo.amountTotal != 0) ||
    (!invoiceInfo.amountPaid && invoiceInfo.amountPaid != 0) ||
    (!invoiceInfo.amountDue && invoiceInfo.amountDue != 0) ||
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
    !depositInfo.amountTotal ||
    !depositInfo.status ||
    !depositInfo.description ||
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
    !appointmentInfo.arrivalDateTime ||
    !appointmentInfo.model ||
    !appointmentInfo.brand ||
    !appointmentInfo.year ||
    !appointmentInfo.color ||
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
  isValidJobOrderId,
  isValidInvoiceId,
  isValidDepositId,
  isValidAppointmentId,
  isValidTaskId,
  isValidPhoneNumber,
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
