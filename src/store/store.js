import { create } from "zustand";

const useStore = create((set) => ({
  userInfo: {},
  articles: [],
  communities: [],
  myCommunities: [],
  setUserData: (newUserData) => set({ userInfo: newUserData }),
  setArticles: (newArticles) => set({ articles: newArticles }), 
  setCommunities: (newCommunities) => set({ communities: newCommunities }), 
  setMyCommunities: (newCommunities) => set({ myCommunities: newCommunities }), 
}));

export default useStore;
