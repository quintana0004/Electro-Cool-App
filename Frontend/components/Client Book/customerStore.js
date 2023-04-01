import { create } from "zustand";

export const useCustomerInfoStore = create((set) => ({
  id: "",
  firstName: "",
  lastName: "",
  date: "",
  phone: "",
  email: "",
  setCustomerInfo: (id, firstName, lastName, date, phone, email) =>
    set((state) => ({
      id: id,
      firstName: firstName,
      lastName: lastName,
      date: date,
      phone: phone,
      email: email,
    })),
  resetClientInformation: () =>
    set((state) => ({
      id: "",
      firstName: "",
      lastName: "",
      date: "",
      phone: "",
      email: "",
    })),
}));
