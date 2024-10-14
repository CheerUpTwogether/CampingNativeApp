import { create } from "zustand";

const useStore = create((set) => ({
  userInfo: {},
  articles: [],
  communities: [],
  setUserData: (newUserData) => set({ userInfo: newUserData }),
  setArticles: (newArticles) => set({ articles: newArticles }), 
  setCommunities: (newCommunities) => set({ communities: newCommunities }), 
}));

export default useStore;
