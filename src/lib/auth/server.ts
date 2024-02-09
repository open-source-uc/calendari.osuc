import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getUser = cache(async () => {
  const supabase = await createClient(cookies());
  return supabase.auth.getUser();
});
