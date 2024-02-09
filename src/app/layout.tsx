import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/components/utils";
import Link from "next/link";
import { getUser } from "@/auth/server";

export const runtime = "edge";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Calendari.osUC",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="es">
      <body className={cn("bg-background min-h-screen font-sans antialiased", fontSans.variable)}>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
        <Link href="/auth/logout">Logout</Link>
        {user?.email}
        {children}
      </body>
    </html>
  );
}
