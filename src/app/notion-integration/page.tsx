import { cookies } from "next/headers";
import NotionIntegrationProviders from "./NotionIntegrationProviders";
import { logout } from "./actions";
import { databases } from "./loaders";
import { Suspense } from "react";

function buildAuthUrl() {
  const url = new URL("https://api.notion.com/v1/oauth/authorize");
  url.searchParams.append("client_id", process.env.NOTION_CLIENT_ID!);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("owner", "user");

  const redirectUrl = new URL(process.env.BASE_URL + "/notion-integration/verify");
  url.searchParams.append("redirect_uri", redirectUrl.toString());
  console.log(redirectUrl.toString());
  return url.toString();
}

function isLoggedIn() {
  console.log(cookies().get("notionAuthToken"));
  return cookies().get("notionAuthToken") !== undefined;
}

async function Databases() {
  const dbs = await databases();
  return (
    <ul>
      {dbs.map((db) => (
        <li key={db.id}>{db.title[0].plain_text}</li>
      ))}
    </ul>
  );
}

export default async function NotionIntegrationPage() {
  return (
    <>
      <h1>Notion Integration Page</h1>
      {isLoggedIn() ? (
        <NotionIntegrationProviders>
          <form action={logout}>
            <button type="submit">Cerrar sesión</button>
          </form>
          <Suspense fallback={"Cargando..."}>
            <Databases />
          </Suspense>
        </NotionIntegrationProviders>
      ) : (
        <a href={buildAuthUrl()}>Iniciar sesión</a>
      )}
    </>
  );
}
