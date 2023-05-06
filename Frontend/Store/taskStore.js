import { create } from "zustand";
import { produce } from "immer";

export const useTaskStore = create((set) => ({
  id: "",
  text: "",
  dueDate: "",
  tasks: [],
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
  addTask: (taskItem) =>
    set(
      produce((draftState) => {
        console.log("DATA STORE: ", taskItem);
        draftState.tasks.push(taskItem);
        console.log("DATA DRAFT: ", draftState.tasks);
      })
    ),
  deleteTasks: (taskID) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskID),
    })),
  clearAllTasks: () => set({ tasks: [] }),
}));
