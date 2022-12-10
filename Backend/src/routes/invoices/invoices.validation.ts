import { IInvoice } from "./../../types/index.d";

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

export { hasRequiredInvoiceFields };
