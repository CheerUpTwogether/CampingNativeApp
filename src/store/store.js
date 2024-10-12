import { create } from "zustand";

const useStore = create((set) => ({
  userInfo: {},
  articles: [],
  favoriteFunc: null,
  setFavoriteFunc: (func) => set({ favoriteFunc: func }),
  setUserData: (newUserData) => set({ userInfo: newUserData }),
  setArticles: (newArticles) => set({ articles: newArticles }), 
}));

export default useStore;
