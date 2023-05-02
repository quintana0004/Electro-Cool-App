import { create } from "zustand";

export const useCalendarStore = create((set) => ({
  reloadCalendarList: false,
  setReloadCalendarList: () =>
    set((state) => ({
      reloadCalendarList: !state.reloadCalendarList,
    })),
}));
