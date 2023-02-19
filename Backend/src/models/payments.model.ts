import prisma from "../database/prisma";
import { IPayment } from "../types";

async function findPaymentById(id: number) {
  try {
    const payment = await prisma.payment.findUnique({
      where: {
        id,
      },
    });

    if (!payment) {
      return null;
    }

    // Append Asset Url for Frontend
    payment.athEvidence = payment.athEvidence
      ? process.env.DO_SPACES_ASSET_URL + payment.athEvidence
      : null;
    payment.bankFrontEvidence = payment.bankFrontEvidence
      ? process.env.DO_SPACES_ASSET_URL + payment.bankFrontEvidence
      : null;
    payment.bankBackEvidence = payment.bankBackEvidence
      ? process.env.DO_SPACES_ASSET_URL + payment.bankBackEvidence
      : null;

    return payment;
  } catch (error) {
    throw error;
  }
}

async function upsertCardPayment(payment: IPayment) {
  try {
    const cardPayment = await prisma.payment.upsert({
      where: {
        id: payment.id ? +payment.id : -1,
      },
      create: {
        type: payment.type,
        athEvidence: payment.athEvidence,
        companyId: payment.companyId,
        invoiceId: +payment.invoiceId,
      },
      update: {
        type: payment.type,
        athEvidence: payment.athEvidence,
        lastModified: new Date(),
        invoiceId: +payment.invoiceId,
      },
    });

    return cardPayment;
  } catch (error) {
    throw error;
  }
}

async function upsertCheckPayment(payment: IPayment) {
  try {
    const checkPayment = await prisma.payment.upsert({
      where: {
        id: payment.id ? +payment.id : -1,
      },
      create: {
        type: payment.type,
        bankStatus: payment.bankStatus,
        bankFrontEvidence: payment.bankFrontEvidence,
        bankBackEvidence: payment.bankBackEvidence,
        companyId: payment.companyId,
        invoiceId: +payment.invoiceId,
      },
      update: {
        type: payment.type,
        bankStatus: payment.bankStatus,
        bankFrontEvidence: payment.bankFrontEvidence,
        bankBackEvidence: payment.bankBackEvidence,
        lastModified: new Date(),
        invoiceId: +payment.invoiceId,
      },
    });

    return checkPayment;
  } catch (error) {
    throw error;
  }
}

async function upsertCashPayment(payment: IPayment) {
  try {
    const cashPayment = await prisma.payment.upsert({
      where: {
        id: payment.id ? +payment.id : -1,
      },
      create: {
        type: payment.type,
        amountPaid: payment.amountPaid,
        companyId: payment.companyId,
        invoiceId: +payment.invoiceId,
      },
      update: {
        type: payment.type,
        amountPaid: payment.amountPaid,
        lastModified: new Date(),
        invoiceId: +payment.invoiceId,
      },
    });

    return cashPayment;
  } catch (error) {
    throw error;
  }
}

async function upsertATHMovilPayment(payment: IPayment) {
  try {
    const athMovilPayment = await prisma.payment.upsert({
      where: {
        id: payment.id ? +payment.id : -1,
      },
      create: {
        type: payment.type,
        referenceNumber: payment.referenceNumber,
        companyId: payment.companyId,
        invoiceId: +payment.invoiceId,
      },
      update: {
        type: payment.type,
        referenceNumber: payment.referenceNumber,
        lastModified: new Date(),
        invoiceId: +payment.invoiceId,
      },
    });

    return athMovilPayment;
  } catch (error) {
    throw error;
  }
}

export {
  findPaymentById,
  upsertCardPayment,
  upsertCheckPayment,
  upsertCashPayment,
  upsertATHMovilPayment,
};
