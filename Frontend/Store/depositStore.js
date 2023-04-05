import { create } from "zustand";

export const useDepositStore = create((set) => ({
  id: "",
  clientSelectedDeposits: [],
  serverSelectedDeposits: [],
  reloadDepositList: false,
  setServerSelectedDeposits: (deposits) =>
    set((state) => ({
      serverSelectedDeposits: deposits
    })),
  setClientSelectedDeposits: (deposits) =>
    set((state) => ({
      clientSelectedDeposits: deposits
    })),
  toggleReloadDepositList: () =>
    set((state) => ({
      reloadDepositList: !state.reloadDepositList,
    })),
  resetSelectedDeposits: () =>
    set((state) => ({
      clientSelectedDeposits: [],
      serverSelectedDeposits: [],
    })),
}));
