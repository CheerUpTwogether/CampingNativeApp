import { create } from "zustand";

const useStore = create((set) => ({
  userInfo: {},
  favoriteFunc: null,
  setFavoriteFunc: (func) => set({ favoriteFunc: func }),
  setUserData: (newUserData) => set({ userInfo: newUserData }),
}));

export default useStore;
