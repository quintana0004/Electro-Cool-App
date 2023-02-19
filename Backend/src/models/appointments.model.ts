import prisma from "../database/prisma";
import { excludeFields } from "../utils/db.utils";
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

async function findAppointmentWithChildsById(id: number) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: id,
      },
      include: {
        customer: true,
        car: true,
      },
    });

    if (!appointment) {
      return null;
    }

    return excludeFields(appointment, "customerId", "carId");
  } catch (error) {
    throw error;
  }
}

async function upsertAppointment(appointmentInfo: IAppointment) {
  try {
    const appointment = await prisma.appointment.upsert({
      where: {
        id: appointmentInfo?.id ?? -1,
      },
      create: {
        service: appointmentInfo.service,
        description: appointmentInfo.description,
        arrivalDateTime: appointmentInfo.arrivalDateTime,
        model: appointmentInfo.model,
        licensePlate: appointmentInfo.licensePlate,
        customerName: appointmentInfo.customerName,
        phone: appointmentInfo.phone,
        email: appointmentInfo.email,
        customerId: appointmentInfo.customerId,
        carId: appointmentInfo.carId,
        companyId: appointmentInfo.companyId,
      },
      update: {
        service: appointmentInfo.service,
        description: appointmentInfo.description,
        arrivalDateTime: appointmentInfo.arrivalDateTime,
        model: appointmentInfo.model,
        licensePlate: appointmentInfo.licensePlate,
        customerName: appointmentInfo.customerName,
        phone: appointmentInfo.phone,
        email: appointmentInfo.email,
        customerId: appointmentInfo.customerId,
        carId: appointmentInfo.carId,
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

export { findAppointmentById, findAppointmentWithChildsById, upsertAppointment, deleteAppointment };
