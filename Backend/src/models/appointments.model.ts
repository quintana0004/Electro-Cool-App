import prisma from "../database/prisma";
import { formatStringToISOFormat } from "../utils/formatters.utils";
import { IAppointment } from "./../types/index.d";

async function findAppointmentById(id: number) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: id,
      },
    });

    return appointment;
  } catch (error) {
    throw error;
  }
}

async function upsertAppointment(appointmentInfo: IAppointment) {
  try {
    const formattedArrivalDateTime = formatStringToISOFormat(
      appointmentInfo.arrivalDateTime
    );
    const appointment = await prisma.appointment.upsert({
      where: {
        id: appointmentInfo?.id ?? -1,
      },
      create: {
        service: appointmentInfo.service,
        description: appointmentInfo.description,
        arrivalDateTime: formattedArrivalDateTime,
        model: appointmentInfo.model,
        licensePlate: appointmentInfo.licensePlate,
        customerName: appointmentInfo.customerName,
        phone: appointmentInfo.phone,
        email: appointmentInfo.email,
        companyId: appointmentInfo.companyId,
      },
      update: {
        service: appointmentInfo.service,
        description: appointmentInfo.description,
        arrivalDateTime: formattedArrivalDateTime,
        model: appointmentInfo.model,
        licensePlate: appointmentInfo.licensePlate,
        customerName: appointmentInfo.customerName,
        phone: appointmentInfo.phone,
        email: appointmentInfo.email,
        lastModified: new Date(),
      },
    });

    return appointment;
  } catch (error) {
    throw error;
  }
}

async function deleteAppointment(id: number) {
  try {
    const appointment = await prisma.appointment.delete({
      where: {
        id: id,
      },
    });

    return appointment;
  } catch (error) {
    throw error;
  }
}

async function findAllAppointments(
  skip: number,
  take: number,
  dateTime: string | undefined
) {
  try {
    const dates = dateTime ? dateTime : undefined;
    const companyAppointments = await prisma.appointment.findMany({
      skip,
      take,
      where: {
        arrivalDateTime: dates,
      },
    });

    return companyAppointments;
  } catch (error) {
    throw error;
  }
}

export {
  findAppointmentById,
  upsertAppointment,
  deleteAppointment,
  findAllAppointments,
};
