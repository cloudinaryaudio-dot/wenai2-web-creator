// weddingStore.js - Updated Zustand Store with Dynamic User Routing
import { create } from "zustand";
import { weddingUsersData } from "../data/weddingUsersData";

export const useWeddingStore = create((set, get) => ({
  /** ACTIVE USER - Default to 'user1' **/
  userId: "user1",
  loading: false,
  error: null,

  /** SET USER FROM ROUTE PARAM **/
  setUser: (userId) => {
    if (!weddingUsersData[userId]) {
      console.warn("Invalid userId:", userId);
      set({ 
        error: `Wedding invitation for ${userId} not found`,
        userId: "user1" // Fallback to user1
      });
      return;
    }
    set({ userId, error: null });
  },

  /** GET FULL USER DATA **/
  getUserData: () => {
    const { userId } = get();
    const userData = weddingUsersData[userId];
    
    if (!userData) {
      console.warn("No data found for userId:", userId);
      return null;
    }
    
    return userData;
  },

  /** PROFILE DATA **/
  getProfileData: () => {
    const data = get().getUserData();
    return data?.profile || null;
  },

  /** COUPLE DATA **/
  getCoupleData: () => {
    const data = get().getUserData();
    return data?.six_couple || null;
  },

  /** ASSETS DATA **/
  getAssetsData: () => {
    const data = get().getUserData();
    return data?.assets || null;
  },

  WelcomeCardData: () => {
    const data = get().getUserData();
    return {
      guestData: data?.pages?.two_guest,
      assets: data?.assets?.two_guest,
      guestNames: data?.two_guestNames,
    };
  },

  GuestNamesData: () =>
    get().WelcomeCardData(),

}));
