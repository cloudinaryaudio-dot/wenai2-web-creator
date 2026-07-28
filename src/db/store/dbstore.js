// invitationStore.js
import { create } from "zustand";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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



please explain me on this 
RLS policies for public read
enable RLS for public read

----------------
weddingUsersData.js
export const pricingData = {
  wedding: "₹2,100",
  engagement: "₹999",
  basic: "₹11,000",
  biodata: "Free",
  premium: "₹1,49,999",
  silver: "₹79,999",
};

useStore.js
export function createPriceStore() {
  return create(() => ({
    data: pricingData ?? null,
  }));
}
export const usePriceStore = createPriceStore();

----------------

import { create } from "zustand";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const usePriceStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPrices: async () => {
    set({ loading: true, error: null });

    const { data, error } = await supabase
      .from("pricing_plans")
      .select("key, price")
      .eq("is_active", true);

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    // Convert rows → object (same shape as before)
    const priceMap = {};
    data.forEach((row) => {
      priceMap[row.key] = row.price;
    });

    set({ data: priceMap, loading: false });
  },
}));

const { data, fetchPrices } = usePriceStore();

useEffect(() => {
  fetchPrices();
}, []);


import { supabase } from "@/lib/supabaseClient";

const { data, error } = await supabase
  .from("pricing_plans")
  .select("*");
