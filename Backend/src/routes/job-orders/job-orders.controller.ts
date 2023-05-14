import { Request, Response } from "express";
import {
  deleteJobOrder,
  findAllCurrentWorkingVehicles,
  findAllJobOrders,
  findJobOrderWithChildsById,
  jobOrderTransaction,
  updateJobOrderStatus,
  upsertJobOrder,
} from "../../models/job-orders.model";
import { ICar, ICustomer, IJobOrder } from "../../types";
import {
  hasRequiredCarFields,
  hasRequiredCustomerFields,
  hasRequiredJobOrderFields,
  isValidCarId,
  isValidCompanyId,
  isValidCustomerId,
  isValidJobOrderId,
  isValidPhoneNumber,
} from "../../utils/validators.utils";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";
import { getDummyCompanyId } from "../../utils/db.utils";
import {
  formatLicensePlate,
  formatName,
  formatPhoneNumber,
} from "../../utils/formatters.utils";
import { isUniqueCar } from "../../models/cars.model";

async function httpGetAllJobOrders(req: Request, res: Response) {
  try {
    let page = req.query.page ? +req.query.page : 0;
    let take = req.query.take ? +req.query.take : 0;
    let searchTerm = req.query.searchTerm
      ? req.query.searchTerm.toString()
      : "";

    const jobOrdersData = await findAllJobOrders(page, take, searchTerm);
    return res.status(200).json(jobOrdersData);
  } catch (error) {
    res.status(500).json("Error in Get All Job Orders");
  }
}

async function httpGetJobOrder(req: Request, res: Response) {
  try {
    const jobOrderId = req.params.id;

    const isJobOrderIdValid = await isValidJobOrderId(jobOrderId);
    if (!isJobOrderIdValid) {
      return handleBadResponse(
        400,
        "The job order Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const jobOrder = await findJobOrderWithChildsById(+jobOrderId);

    return res.status(200).json(jobOrder);
  } catch (error) {
    return handleExceptionErrorResponse("get job order by id", error, res);
  }
}

async function httpUpsertJobOrder(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();
    const jobOrderInfo: IJobOrder = {
      id: req.body.id,
      requestedService: req.body.requestedService,
      serviceDetails: req.body.serviceDetails,
      status: req.body.status,
      jobLoadType: req.body.jobLoadType,
      policySignature: req.body.policySignature,
      carId: req.body.carId,
      companyId: companyId,
      customerId: req.body.customerId,
    };

    const hasRequiredFields = hasRequiredJobOrderFields(jobOrderInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create job order. Please provide the following fields: requestedService, serviceDetails, status, jobLoadType, carId, companyId and customerId.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(jobOrderInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCustomerIdValid = await isValidCustomerId(jobOrderInfo.customerId);
    if (!isCustomerIdValid) {
      return handleBadResponse(
        400,
        "The customer Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isCarIdValid = await isValidCarId(jobOrderInfo.carId);
    if (!isCarIdValid) {
      return handleBadResponse(
        400,
        "The car Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const upsertedJob = await upsertJobOrder(jobOrderInfo);
    return res.status(200).json(upsertedJob);
  } catch (error) {
    return handleExceptionErrorResponse("upsert car", error, res);
  }
}

async function httpJobOrderTransaction(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    const customerInfo: ICustomer = {
      firstName: formatName(req.body.customer.firstName),
      lastName: formatName(req.body.customer.lastName),
      addressLine1: req.body.customer.addressLine1,
      addressLine2: req.body.customer.addressLine2,
      state: req.body.customer.state,
      city: req.body.customer.city,
      phone: formatPhoneNumber(req.body.customer.phone),
      email: req.body.customer.email,
      companyId: companyId,
    };

    const carInfo: ICar = {
      brand: req.body.car.brand,
      licensePlate: formatLicensePlate(req.body.car.licensePlate),
      model: req.body.car.model,
      year: req.body.car.year,
      mileage: req.body.car.mileage,
      color: req.body.car.color,
      vinNumber: formatLicensePlate(req.body.car.vinNumber),
      carHasItems: req.body.car.carHasItems,
      carItemsDescription: req.body.car.carItemsDescription,
      companyId: companyId,
      customerId: -1,
    };

    const jobOrderInfo: IJobOrder = {
      requestedService: req.body.jobOrder.requestedService,
      serviceDetails: req.body.jobOrder.serviceDetails,
      status: req.body.jobOrder.status,
      jobLoadType: req.body.jobOrder.jobLoadType,
      policySignature: req.body.jobOrder.policySignature,
      companyId: companyId,
      customerId: -1,
      carId: -1,
    };

    const isCompanyIdValid = await isValidCompanyId(customerInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const hasCustomerRequiredFields = hasRequiredCustomerFields(customerInfo);
    if (!hasCustomerRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update customer. Please provide the following fields: firstName, lastName, addressLine1, city, phone and companyId.",
        res
      );
    }

    const hasCarRequiredFields = hasRequiredCarFields(carInfo);
    if (!hasCarRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update car. Please provide the following fields: brand, licensePlate, model, year, mileage, color, vinNumber, companyId, customerId. Additionally assure that your numeric ids are in number format.",
        res
      );
    }

    const isCarUnique = await isUniqueCar(
      carInfo.licensePlate,
      carInfo.vinNumber,
      carInfo.id
    );
    if (!isCarUnique) {
      return handleBadResponse(
        400,
        "Car does not have a unique license plate and/or vin number.",
        res
      );
    }

    const isPhoneNumberFormatValid = isValidPhoneNumber(customerInfo.phone);
    if (!isPhoneNumberFormatValid) {
      return handleBadResponse(
        400,
        "The phone number provided is not valid. Please provide a phone number with 10 digits.",
        res
      );
    }

    const hasRequiredFields = hasRequiredJobOrderFields(jobOrderInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create job order. Please provide the following fields: requestedService, serviceDetails, status, jobLoadType, carId, companyId and customerId.",
        res
      );
    }

    const upsertedJob = await jobOrderTransaction(
      jobOrderInfo,
      customerInfo,
      carInfo
    );
    return res.status(200).json(upsertedJob);
  } catch (error) {
    return handleExceptionErrorResponse("job order transaction", error, res);
  }
}

async function httpUpdateJobOrderStatus(req: Request, res: Response) {
  try {
    const jobOrderId = req.body.id;
    const status = req.body.status;

    const isJobOrderIdValid = await isValidJobOrderId(jobOrderId);
    if (!isJobOrderIdValid) {
      return handleBadResponse(
        400,
        "The job order Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const jobOrder = await updateJobOrderStatus(+jobOrderId, status);
    return res.status(200).json(jobOrder);
  } catch (error) {
    return handleExceptionErrorResponse("update job order status", error, res);
  }
}

async function httpDeleteJobOrder(req: Request, res: Response) {
  try {
    const jobOrderId = req.params.id;

    const isJobOrderIdValid = await isValidJobOrderId(jobOrderId);
    if (!isJobOrderIdValid) {
      return handleBadResponse(
        400,
        "The job order Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const jobOrder = await deleteJobOrder(+jobOrderId);
    return res.status(200).json(jobOrder);
  } catch (error) {
    return handleExceptionErrorResponse("delete job order by id", error, res);
  }
}

export {
  httpGetAllJobOrders,
  httpGetJobOrder,
  httpUpsertJobOrder,
  httpJobOrderTransaction,
  httpUpdateJobOrderStatus,
  httpDeleteJobOrder,
};
