import { create } from "zustand";

export const useSettingStore = create((set) => ({
  firstName: "",
  lastName: "",
  ID: "",
  status: "",
  startDate: "",
  lastDate: "",
  reloadSettingList: false,
  toggleReloadSettingList: () =>
    set((state) => ({
      reloadSettingList: !state.reloadSettingList,
    })),
  setUserSetting: (firstName, lastName, id, statusUser, startDate, lastDate) =>
    set((state) => ({
      firstName: firstName,
      lastName: lastDate,
      ID: id,
      status: statusUser,
      startDate: startDate,
      lastDate: lastDate,
    })),
}));
