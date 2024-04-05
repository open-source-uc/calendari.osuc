"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // Remove cookie and revalidate page
  cookies().delete("notionAuthToken");
  revalidatePath("/notion-integration");
  redirect("/notion-integration");
}
