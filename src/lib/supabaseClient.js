import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase env vars missing — running in mock/localStorage mode. Supabase client is a no-op."
  );
}

// Safe stub so imports don't crash the app when env vars are absent.
// The app now uses DataContext (localStorage) as its data source.
const stub = new Proxy(
  {},
  {
    get() {
      return () => stub;
    },
  }
);

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : stub;

