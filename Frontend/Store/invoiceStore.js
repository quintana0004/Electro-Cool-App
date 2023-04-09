import { create } from "zustand";

export const useInvoiceStore = create((set) => ({
  id: "",
  status: "",
  amountTotal: 0,
  amountPaid: 0,
  amountDue: 0,
  invoiceItems: "",
  customerId: "",
  carId: "",
  invoiceItems: [],
  depositIds: [],
  reloadInvoiceList: false,
  toggleReloadInvoiceList: () =>
    set((state) => ({
      reloadInvoiceList: !state.reloadInvoiceList,
    })),
  setInvoice: (invoice) =>
    set((state) => ({
      id: invoice.id,
      status: invoice.status,
      amountTotal: invoice.amountTotal0,
      amountPaid: invoice.amountPaid0,
      amountDue: invoice.amountDue0,
      invoiceItems: invoice.invoiceItems,
      customerId: invoice.customerId,
      carId: invoice.carId,
      invoiceItems: invoice.invoiceItems,
      depositIds: invoice.depositIds,
    })),
  resetInvoice: () =>
    set((state) => ({
      id: "",
      status: "",
      amountTotal: 0,
      amountPaid: 0,
      amountDue: 0,
      invoiceItems: "",
      customerId: "",
      carId: "",
      invoiceItems: [],
      depositIds: [],
    })),
}));
