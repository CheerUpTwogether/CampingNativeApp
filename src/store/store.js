import { create } from "zustand";

const useStore = create((set) => ({
  userInfo: {},
  setUserData: (newUserData) => set({ userInfo: newUserData }),
}));

export default useStore;
