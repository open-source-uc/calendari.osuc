import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) return new Response("Invalid arguments", { status: 400 });

  const auth = Buffer.from(`${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`).toString("base64");

  const thisUrl = new URL(url.origin);
  thisUrl.pathname = "/notion-integration/verify";
  console.log(thisUrl.toString());

  const response = await fetch("https://api.notion.com/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}:`,
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: thisUrl.toString(),
    }),
  });

  const data = await response.json();

  const redirectUrl = new URL(url.origin);
  redirectUrl.pathname = "/notion-integration";

  // Set the token as a cookie
  cookies().set("notionAuthToken", data.access_token);

  return NextResponse.redirect(redirectUrl);
}
