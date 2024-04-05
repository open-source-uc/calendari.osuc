import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cookies } from "next/headers";
import { cache } from "react";

const notion = cache(() => {
  const token = cookies().get("notionAuthToken");
  if (!token) throw new Error("Notion token not found");
  return new Client({ auth: token.value });
});

export async function databases() {
  const response = await notion().search({ filter: { value: "database", property: "object" } });
  return response.results as DatabaseObjectResponse[];
}

export async function databaseProperties(database_id: string) {
  return notion().databases.retrieve({ database_id });
}
