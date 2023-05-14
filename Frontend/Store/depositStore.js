import { create } from "zustand";

export const useDepositStore = create((set) => ({
  id: "",
  description: "",
  amount: 0,
  createdDate: "",
  clientSelectedDeposits: [],
  serverSelectedDeposits: [],
  reloadDepositList: false,
  setDeposit: (id, description, amount, createdDate) =>
    set((state) => ({
      id: id,
      description: description,
      amount: amount,
      createdDate: createdDate,
    })),
  setDepositId: (id) =>
    set((state) => ({
      id: id,
    })),
  setServerSelectedDeposits: (deposits) =>
    set((state) => ({
      serverSelectedDeposits: deposits,
    })),
  setClientSelectedDeposits: (deposits) =>
    set((state) => ({
      clientSelectedDeposits: deposits,
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
  resetDeposit: () =>
    set((state) => ({
      id: "",
      description: "",
      amount: 0,
      createdDate: "",
    })),
}));
