import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { User } from "./types";

export const getUser = cache(async () => {
  const supabase = await createClient(cookies());
  const response = await supabase.auth.getUser();
  if (response.error) return null;
  return response.data.user as User;
});

export const register = async ({ email, password }: { email: string; password: string }) => {
  const supabase = await createClient(cookies());
  const response = await supabase.auth.signUp({ email, password });
  return response;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const supabase = await createClient(cookies());
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response;
};

export const logout = async () => {
  const supabase = await createClient(cookies());
  await supabase.auth.signOut();
  return;
};
