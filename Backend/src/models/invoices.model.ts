import prisma from "../database/prisma";
import { IInvoice } from "./../types/index.d";

async function upsertInvoice(invoiceInfo: IInvoice) {
  try {
    // const invoice = await prisma.invoice.upsert({
    //   where: {
    //     id: invoiceInfo?.id ?? -1
    //   },
    //   create: {
    //   },
    //   update: {
    //   }
    // })
  } catch (error) {
    throw error;
  }
}
