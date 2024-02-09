import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

async function loginAction(form: FormData) {
  "use server";
  const supabase = await createClient(cookies());
  const email = form.get("email") as string;

  const response = await supabase.auth.signInWithOtp({ email });

  console.log(response);
}

export default async function LogInPage() {
  return (
    <div>
      <h1>Log In</h1>
      <form action={loginAction}>
        <input type="email" name="email" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
