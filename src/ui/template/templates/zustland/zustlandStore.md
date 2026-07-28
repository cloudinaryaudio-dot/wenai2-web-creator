store/useWeddingStore.js

import { create } from "zustand";
import { weddingUsersData } from "@/data/weddingUsersData";

export const useWeddingStore = create((set, get) => ({
  /** ACTIVE USER **/
  userId: "user1",

  /** SET USER FROM ROUTE PARAM **/
  setUser: (userId) => {
    if (!weddingUsersData[userId]) {
      console.warn("Invalid userId:", userId);
      return;
    }
    set({ userId });
  },

  /** GET FULL USER DATA **/
  getUserData: () => {
    const { userId } = get();
    return weddingUsersData[userId];
  },

  /** PAGE-LEVEL SELECTORS (IMPORTANT) **/
  TapToStartButtonData: () =>
    weddingUsersData[get().userId].TapToStartButtonData,

  GuestNamesData: () =>
    weddingUsersData[get().userId].GuestNamesData,

  WelcomeCardData: () =>
    weddingUsersData[get().userId].WelcomeCardData,

  RoyalTemplateFirstPageData: () =>
    weddingUsersData[get().userId].RoyalTemplateFirstPageData,

  RoyalTemplateSecondPageData: () =>
    weddingUsersData[get().userId].RoyalTemplateSecondPageData,

  AutoScrollBGThirdPageData: () =>
    weddingUsersData[get().userId].AutoScrollBGThirdPageData,

  BrideGroomFourthPageData: () =>
    weddingUsersData[get().userId].BrideGroomFourthPageData,

  FunctionCardsFifthPageData: () =>
    weddingUsersData[get().userId].FunctionCardsFifthPageData,

  ImageCardSectionSixPageData: () =>
    weddingUsersData[get().userId].ImageCardSectionSixPageData,

  WeddingVideoSeventhPageData: () =>
    weddingUsersData[get().userId].WeddingVideoSeventhPageData,

  WishesEightPageData: () =>
    weddingUsersData[get().userId].WishesEightPageData,

  VenueNinePageData: () =>
    weddingUsersData[get().userId].VenueNinePageData,

  NamesTenthPageData: () =>
    weddingUsersData[get().userId].NamesTenthPageData,

  ThanksElevenPageData: () =>
    weddingUsersData[get().userId].ThanksElevenPageData,

  NoteTwelvePageData: () =>
    weddingUsersData[get().userId].NoteTwelvePageData,

  QrCodeThirteenPageData: () =>
    weddingUsersData[get().userId].QrCodeThirteenPageData,
}));
