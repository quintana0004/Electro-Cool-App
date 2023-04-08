import { Invoice_Item } from "@prisma/client";
import prisma from "../database/prisma";
import { excludeFields } from "../utils/db.utils";
import { isNumeric } from "../utils/validators.utils";
import { IInvoice, IInvoiceItem } from "./../types/index.d";
import { updateDepositsParentInvoice } from "./deposits.model";

async function findAllInvoices(
  page: number,
  take: number,
  searchTerm: string | undefined
) {
  try {
    const term = searchTerm ?? "";
    const idSearchTerm = isNumeric(term) ? Number(term) : undefined;
    const overFetchAmount = take * 2;
    const skipAmount = page * take;

    const invoices = await prisma.invoice.findMany({
      skip: skipAmount,
      take: overFetchAmount,
      where: {
        OR: [
          {
            customer: {
              fullName: {
                contains: term,
              },
            },
          },
          {
            id: {
              in: idSearchTerm,
            },
          },
          {
            car: {
              licensePlate: {
                contains: term,
              },
            },
          },
        ],
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        car: {
          select: {
            licensePlate: true,
          },
        },
      },
    });

    const invoicesData = {
      data: invoices.slice(0, take),
      isLastPage: invoices.length <= take,
      currentPage: page,
    };
    return invoicesData;
  } catch (error) {
    throw error;
  }
}

async function findInvoiceById(id: number) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: id,
      },
    });

    return invoice;
  } catch (error) {
    throw error;
  }
}

async function findInvoiceWithChildsById(id: number) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: id,
      },
      include: {
        customer: true,
        car: true,
        invoiceItems: true,
      },
    });

    if (!invoice) {
      return null;
    }

    return excludeFields(invoice, "customerId", "carId");
  } catch (error) {
    throw error;
  }
}

async function upsertInvoice(invoiceInfo: IInvoice) {
  try {
    const invoice = await prisma.invoice.upsert({
      where: {
        id: invoiceInfo?.id ?? -1,
      },
      create: {
        status: invoiceInfo.status,
        amountTotal: invoiceInfo.amountTotal,
        amountPaid: invoiceInfo.amountPaid,
        amountDue: invoiceInfo.amountDue,
        companyId: invoiceInfo.companyId,
        customerId: Number(invoiceInfo.customerId),
        carId: Number(invoiceInfo.carId),
      },
      update: {
        status: invoiceInfo.status,
        amountTotal: invoiceInfo.amountTotal,
        amountPaid: invoiceInfo.amountPaid,
        amountDue: invoiceInfo.amountDue,
        companyId: invoiceInfo.companyId,
        customerId: Number(invoiceInfo.customerId),
        carId: Number(invoiceInfo.carId),
        lastModified: new Date(),
      },
    });

    // Query all Invoice Items related to this invoice.
    const invoiceId: number = invoice.id;
    const invoiceItemsInDB = await prisma.invoice_Item.findMany({
      where: {
        invoiceId: invoiceId,
      },
    });

    // Collect all invoiceItems with Ids from incoming list of invoice items in request.
    let invoiceItemIdsMapInRequest: Map<number, IInvoiceItem> = new Map<
      number,
      IInvoiceItem
    >();
    for (const invoiceItem of invoiceInfo.invoiceItems) {
      if (invoiceItem.id != undefined) {
        invoiceItemIdsMapInRequest.set(invoiceItem.id, invoiceItem);
      }
    }

    // Compare Ids from Request and DB to determine whic Invoice Items to Delete
    let invoiceItemIdsToDelete: number[] = [];
    let invoiceItemIdsInDB: number[] = invoiceItemsInDB.map(
      (invoiceItem) => invoiceItem.id
    );
    for (const itemIdInDB of invoiceItemIdsInDB) {
      let invoiceItem = invoiceItemIdsMapInRequest.get(itemIdInDB);
      if (invoiceItem === undefined) {
        invoiceItemIdsToDelete.push(itemIdInDB);
      }
    }

    // Delete Invoice Items that got removed
    if (invoiceItemIdsToDelete.length != 0) {
      await prisma.invoice_Item.deleteMany({
        where: {
          id: {
            in: [...invoiceItemIdsToDelete],
          },
        },
      });
    }

    // Upsert Invoice Items
    let invoiceItemsUpserted: Invoice_Item[] = [];
    for (const invoiceItem of invoiceInfo.invoiceItems) {
      let upsertedInvoiceItem = await prisma.invoice_Item.upsert({
        where: {
          id: invoiceItem?.id ?? -1,
        },
        create: {
          description: invoiceItem.description,
          quantity: invoiceItem.quantity,
          unitPrice: invoiceItem.unitPrice,
          totalPrice: invoiceItem.totalPrice,
          warranty: invoiceItem.warranty,
          invoiceId: invoiceId,
        },
        update: {
          description: invoiceItem.description,
          quantity: invoiceItem.quantity,
          unitPrice: invoiceItem.unitPrice,
          totalPrice: invoiceItem.totalPrice,
          warranty: invoiceItem.warranty,
          lastModified: new Date(),
        },
      });

      invoiceItemsUpserted.push(upsertedInvoiceItem);
    }

    // Update Deposits Parent Invoice if the Request Included a list
    // of Deposit Ids for this Invoice
    if (!!invoiceInfo.depositIds?.length) {
      await updateDepositsParentInvoice(invoiceInfo.depositIds, invoiceId);
    }

    // Query the invoice after all is updated to send back
    // to client the most updated invoice as confirmation
    const invoiceAfterUpsert = await prisma.invoice.findUnique({
      where: {
        id: invoice.id,
      },
      include: {
        invoiceItems: true,
        deposits: true,
      },
    });

    return invoiceAfterUpsert;
  } catch (error) {
    throw error;
  }
}

async function deleteInvoice(id: number) {
  try {
    const invoice = await prisma.invoice.delete({
      where: {
        id: id,
      },
    });

    return invoice;
  } catch (error) {
    throw error;
  }
}

export {
  findAllInvoices,
  findInvoiceById,
  findInvoiceWithChildsById,
  upsertInvoice,
  deleteInvoice,
};
