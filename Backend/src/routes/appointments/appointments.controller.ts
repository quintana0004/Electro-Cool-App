import { IAppointment } from "./../../types/index.d";
import { Request, Response } from "express";
import {
  handleBadResponse,
  handleExceptionErrorResponse,
} from "../../utils/errors.utils";
import {
  hasRequiredAppointmentFields,
  isValidAppointmentId,
  isValidCompanyId,
  isIsoDate,
} from "../../utils/validators.utils";
import {
  findAllAppointments,
  deleteAppointment,
  findAppointmentWithChildsById,
  upsertAppointment,
} from "../../models/appointments.model";
import { getDummyCompanyId } from "../../utils/db.utils";

async function httpGetAllAppointments(req: Request, res: Response) {
  try {
    let page = req.query.page ? +req.query.page : 0;
    let take = req.query.take ? +req.query.take : 0;
    let searchTerm = req.query.searchTerm
      ? req.query.searchTerm.toString()
      : "";

    const isDateFormatValid = isIsoDate(searchTerm);
    if (!isDateFormatValid) {
      return handleBadResponse(
        400,
        `The date provided for the Arrival Date Time is not valid. The correct format must be in ISO as the following: "YYYY-MM-DDTHH:MN:SS.MSSZ".`,
        res
      );
    }

    const appointmentsData = await findAllAppointments(page, take, searchTerm);

    return res.status(200).json(appointmentsData);
  } catch (error) {
    return handleExceptionErrorResponse("get all appointments", error, res);
  }
}

async function httpGetAppointmentById(req: Request, res: Response) {
  try {
    const appointmentId = req.params.id;

    const isAppointmentIdValid = await isValidAppointmentId(appointmentId);
    if (!isAppointmentIdValid) {
      return handleBadResponse(
        400,
        "The appointment Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const appointment = await findAppointmentWithChildsById(+appointmentId);

    return res.status(200).json(appointment);
  } catch (error) {
    return handleExceptionErrorResponse("get appointment by id", error, res);
  }
}

// example of todays date in ISO format: "2021-08-10T00:00:00.000Z"

async function httpUpsertAppointment(req: Request, res: Response) {
  try {
    // Temporary Dummy Id
    const companyId = await getDummyCompanyId();

    const appointmentInfo: IAppointment = {
      id: req.body.id,
      service: req.body.service,
      description: req.body.description,
      arrivalDateTime: req.body.arrivalDateTime,
      model: req.body.model,
      brand: req.body.brand,
      year: req.body.year,
      color: req.body.color,
      licensePlate: req.body.licensePlate,
      customerName: req.body.customerName,
      phone: req.body.phone,
      email: req.body.email,
      customerId: req.body.customerId,
      carId: req.body.carId,
      companyId: companyId,
    };

    const hasRequiredFields = hasRequiredAppointmentFields(appointmentInfo);
    if (!hasRequiredFields) {
      return handleBadResponse(
        400,
        "Missing required fields to create/update appointment. Please provide the following fields: service, description, arrivalDateTime, model, brand, year, color, licensePlate, customerName, phone, email and companyId.",
        res
      );
    }

    const isCompanyIdValid = await isValidCompanyId(appointmentInfo.companyId);
    if (!isCompanyIdValid) {
      return handleBadResponse(
        400,
        "The company Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const isDateFormatValid = isIsoDate(appointmentInfo.arrivalDateTime);
    if (!isDateFormatValid) {
      return handleBadResponse(
        400,
        `The date provided for the Arrival Date Time is not valid. The correct format must be in ISO as the following: "YYYY-MM-DDTHH:MN:SS.MSSZ".`,
        res
      );
    }

    const upsertedAppointment = await upsertAppointment(appointmentInfo);
    return res.status(200).json(upsertedAppointment);
  } catch (error) {
    return handleExceptionErrorResponse("upsert appointments", error, res);
  }
}

async function httpDeleteAppointment(req: Request, res: Response) {
  try {
    const appointmentId = req.params.id;

    const isAppointmentIdValid = await isValidAppointmentId(appointmentId);
    if (!isAppointmentIdValid) {
      return handleBadResponse(
        400,
        "The appointment Id provided is invalid or does not exist in the database. Please try again with a valid Id.",
        res
      );
    }

    const deletedAppointment = await deleteAppointment(Number(appointmentId));
    return res.status(200).json(deletedAppointment);
  } catch (error) {
    return handleExceptionErrorResponse("delete appointments", error, res);
  }
}

export {
  httpGetAllAppointments,
  httpGetAppointmentById,
  httpUpsertAppointment,
  httpDeleteAppointment,
};
