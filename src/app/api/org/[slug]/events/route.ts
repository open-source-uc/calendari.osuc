import { NotionIntegration, queryNotionDatabaseEvents } from "@/lib/notion";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const integration: NotionIntegration = {
  databaseId: "9834fa9606d8461899ff278459c5d982",
  dateFieldId: "Date",
  urlFieldId: "URL",
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");

  if (!start || !end) return new Response("Invalid arguments", { status: 400 });

  const response = await queryNotionDatabaseEvents({ start, end }, integration);
  return Response.json(response);
}
