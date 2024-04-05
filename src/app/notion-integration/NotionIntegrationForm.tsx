"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState, useContext, createContext } from "react";
import { Client } from "@notionhq/client";
import { PartialDatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { logout } from "./actions";



export default function NotionIntegrationForm({ clientId }: { clientId: string }) {
  const auth = useAuth(clientId);

  if (!auth.token) {
    return <a href={auth.url}>Iniciar sesión</a>;
  }

  return (
    <NotionClientProvider token={auth.token}>
      {auth.token}
      <form action={logout}>
        Cerrar sesión
        <button type="submit">Cerrar sesión</button>
      </form>
      <SelectDatabase />
    </NotionClientProvider>
  );
}

function SelectDatabase() {
  const { notion, token } = useNotion();
  const { data } = useQuery({
    queryKey: ["notion", token, "databases"],
    queryFn: async () => {
      const response = await notion.search({ filter: { value: "database", property: "object" } });
      return response.results as PartialDatabaseObjectResponse[];
    },
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
