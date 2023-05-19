import { create } from "zustand";

export const useAccountUser = create((set) => ({
  username: "",
  password: "",
  role: "",
  setAccountUser: (username, password) =>
    set((state) => ({ username: username, password: password })),
  setRoleUser: (role) => set((state) => ({ role: role })),
}));
