// weddingStore.js - Updated Zustand Store with Dynamic User Routing
import { create } from "zustand";
import { weddingUsersData, bioData, engagementData } from "../data/weddingUsersData";

export const useWeddingStore = create((set) => ({
  /** STATE */
  userId: "user1",
  data: null,  
  loading: false,  
  error: null,

  /** ACTION */
  setUser: (userId) => {
    set({ loading: true, error: null });

    const userData = weddingUsersData[userId];

    if (!userData) {
      set({
        userId: "user1",
        data: weddingUsersData["user1"] ?? null,
        error: `Wedding invitation for ${userId} not found`,
        loading: false,
      });
      return;
    }

    set({
      userId,
      data: userData,
      loading: false,
      error: null,
    });
  },
}));

export const useBioDataStore = create((set) => ({
  /** ACTIVE USER - Default to 'user1' **/
  userId: "user1",
  loading: false,
  error: null,
  data: null,  
  

  /** SET USER FROM ROUTE PARAM **/
  setUser: (userId) => {
    set({ loading: true, error: null });

    const userData = bioData[userId];

    if (!userData) {
      set({
        userId: "user1",
        data: bioData["user1"] ?? null,
        error: `Wedding invitation for ${userId} not found`,
        loading: false,
      });
      return;
    }

    set({
      userId,
      data: userData,
      loading: false,
      error: null,
    });
  },
  
}));

export const useEngagementStore = create( (set )  => ({
  /** ACTIVE USER - Default to 'user1' **/
  userId: "user1",
  loading: false,
  error: null,
  data: null,  
  

  /** SET USER FROM ROUTE PARAM **/
  setUser: (userId) => {
    set({ loading: true, error: null });

    const userData = engagementData[userId];

    if (!userData) {
      set({
        userId: "user1",
        data: engagementData["user1"] ?? null,
        error: `Wedding invitation for ${userId} not found`,
        loading: false,
      });
      return;
    }

    set({
      userId,
      data: userData,
      loading: false,
      error: null,
    });
  },
  
}));