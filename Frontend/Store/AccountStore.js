import { create } from "zustand";

export const useAccountUser = create((set) => ({
  username: "",
  password: "",
  setAccountUser: (username, password) =>
    set((state) => ({ username: username, password: password })),
}));
