import { logout } from "@/auth/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET() {
  await logout();
  revalidatePath("/", "layout");
  redirect("/");
}
