import { create } from "zustand";

export const useInvoiceStore = create((set) => ({
  reloadInvoiceList: false,
  toggleReloadInvoiceList: () =>
    set((state) => ({
      reloadInvoiceList: !state.reloadInvoiceList,
    })),
}));
