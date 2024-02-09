import { login } from "@/auth/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function loginAction(form: FormData) {
  "use server";
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const response = await login({ email, password });
  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    revalidatePath("/");
    redirect("/");
  }
}

export default async function LogInPage() {
  return (
    <div>
      <h1>Log In</h1>
      <form action={loginAction}>
        <label>Email</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
