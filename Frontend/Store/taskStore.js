import { create } from "zustand";

export const useTaskStore = create((set) => ({
  id: "",
  text: "",
  dueDate: "",
  reloadTaskList: false,
  setTask: (id, text, dueDate) =>
    set((state) => ({
      id: id,
      text: text,
      dueDate: dueDate,
    })),
  resetTask: () =>
    set((state) => ({
      id: "",
      text: "",
      dueDate: "",
    })),
  setReloadTaskList: () =>
    set((state) => ({
      reloadTaskList: !state.reloadTaskList,
    })),
}));
