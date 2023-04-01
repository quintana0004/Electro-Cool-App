import { create } from "zustand";

export const useRouterStore = create((set) => ({
  existingClientNextPage: "",
  existingCarNextPage: "",
  clientSelectionNextPage: "",
  carSelectionNextPage: "",
  setExistingClientNextPage: (nextPage) => 
    set((state) => ({
      existingClientNextPage: nextPage 
  })),
  setExistingCarNextPage: (nextPage) => 
    set((state) => ({
      existingCarNextPage: nextPage 
  })),
}));
