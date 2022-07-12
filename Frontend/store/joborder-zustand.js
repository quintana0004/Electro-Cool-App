import create from "zustand";

// --- Job Order Store ---
//? --- Must perform the following ---
//? 1. Add
//? 2. Update
//? 3. Delete
//? 4. Set data
//? 5. Any other function needed !!! Consult with Jessica or Jan
export const useJobOrder = create((set) => ({
  jobOrder: [],
  setJobOrder: (jobOrderData) => set({ jobOrder: jobOrderData }),
  addJobOrder: (jobOrderData) =>
    set((state) => ({ jobOrder: state.jobOrder.push(jobOrderData) })),
  updateStatusJobOrder: (statusJobOrder) => {},
}));
