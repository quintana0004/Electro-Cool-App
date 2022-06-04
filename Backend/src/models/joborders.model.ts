import { JobOrder } from "@prisma/client";
import { prisma } from "../database";
import { IErrorResponse, IJobOder } from './../types/index.d';
import { findCarByVIN } from "./cars.model";
import { findCompanyByName } from "./company.model";
import { findCustomerByNameAndPhone } from "./customers.model";

async function createJobOrder(jobOrder: IJobOder) : Promise<JobOrder | IErrorResponse> {
  try {

    const company = await findCompanyByName(jobOrder.companyName);
    if (!company) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "The company name was not found in the system. Please assure you pass a valid company name.",
      };
      return error;
    }

    const customer = await findCustomerByNameAndPhone(
      jobOrder.customerName,
      jobOrder.customerPhone
    );
    if (!customer) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "The customer specified was not found in the system. Please assure you pass a valid customer name and customer phone number.",
      };
      return error;
    }    
    
    const car = await findCarByVIN(jobOrder.carVinNumber);
    if (!car) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "A Car with this VIN Number does not exist. Please provide another VIN Number.",
      };
      return error;
    }

    
    const createdJobOrder = await prisma.jobOrder.create({
      data: {
        service: jobOrder.service,
        serviceDetails: jobOrder.serviceDetails,
        status: jobOrder.status,
        isHeavy: jobOrder.isHeavy,
        isLight: jobOrder.isLight,
        companyId: company.id,
        customerId: customer.id,
        carId: car.id
      }
    })

    const jobOrderWithoutId = exclude(createdJobOrder, 'id', 'companyId', 'customerId', 'carId');
    return jobOrderWithoutId;

  } catch (error) {
    throw error;
  }  
}

function exclude<JobOrder, Key extends keyof JobOrder>(jobOrder: JobOrder, ...keys: Key[]): JobOrder {
  for (let key of keys) {
    delete jobOrder[key];
  }
  return jobOrder;
}

export {
  createJobOrder
}