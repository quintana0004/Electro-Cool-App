import { create } from "zustand";

export const useDepositStore = create((set) => ({
  id: "",
  clientSelectedDeposits: [],
  serverSelectedDeposits: [],
  setServerSelectedDeposits: (deposits) =>
    set((state) => ({
      serverSelectedDeposits: deposits
    })),
  setClientSelectedDeposits: (deposits) =>
    set((state) => ({
      clientSelectedDeposits: deposits
    })),
  resetSelectedDeposits: () =>
    set((state) => ({
      clientSelectedDeposits: [],
      serverSelectedDeposits: [],
    })),
}));
