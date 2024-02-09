import { register } from "@/auth/server";

async function registerAction(form: FormData) {
  "use server";
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const response = await register({ email, password });

  console.log(response);
}

export default async function RegisterPage() {
  return (
    <div>
      <h1>Log In</h1>
      <form action={registerAction}>
        <label>Email</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
