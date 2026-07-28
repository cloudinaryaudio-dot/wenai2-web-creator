// weddingStore.js - Updated Zustand Store with Dynamic User Routing
import { create } from "zustand";
import { contactData } from "../data/weddingUsersData";
import {supabase} from "../../lib/supabaseClient";

export function createInvitationStore(tableName) {
  return create((set) => ({
    data: null,
    error: null,
    loading: false,

    // Fetch by invitation id + slug (URL-safe)
    fetchInvitation: async ({ id, slug }) => {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from(tableName)
        .select("data")
        .eq("id", id)
        .eq("slug", slug)
        .single();

      if (error || !data) {
        set({
          data: null,
          error: "Invitation not found",
          loading: false,
        });
        return;
      }

      set({
        data: data.data,
        error: null,
        loading: false,
      });
    },

    reset: () =>
      set({
        data: null,
        error: null,
        loading: false,
      }),
  }));
}

export const useWeddingStore =
  createInvitationStore("wedding_invitations");

export const useEngagementStore =
  createInvitationStore("engagement_invitations");

export const useBioDataStore =
  createInvitationStore("biodata_invitations");

export const usePriceStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPrices: async () => {
  console.log("fetchPrices CALLED");

  set({ loading: true, error: null });

  const { data, error } = await supabase
    .from("pricing_plans")
    .select("key, price")
    .eq("is_active", true);

  // console.log("SUPABASE RESULT:", data, error);

  if (error) {
    set({ error: error.message, loading: false });
    return;
  }

  const priceMap = {};
  data.forEach((row) => {
    priceMap[row.key] = row.price;
  });

  // console.log("MAPPED PRICE:", priceMap);

  set({ data: priceMap, loading: false });
},

}));

export const useContactStore = create(() => ({
    data: contactData ?? null,
}));



