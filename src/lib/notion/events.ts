import { CalendarEvent, CalendarQuery } from "../event";
import { notion } from "./client";
import { type NotionIntegration } from "./integration";

function extractTitle(result: any): string {
  return result.properties.Name.title[0].plain_text;
}

function getFieldByNameOrId(result: any, fieldId: string) {
  if (fieldId in result.properties) {
    return result.properties[fieldId];
  }

  for (const key in result.properties) {
    if (result.properties[key].id === fieldId) {
      return result.properties[key];
    }
  }
  throw new Error(`Field with id ${fieldId} not found`);
}
function extractDate(result: any, fieldId: string) {
  const date = getFieldByNameOrId(result, fieldId).date;
  // Detect if the field is all day
  // in notion, if no time is set, it's an all day event
  const allDay = !date.start.includes("T");

  if (!allDay) return { allDay, ...date };

  // If it is a full event, we need to patch the end date
  // to add another day, since calendar consider it as exclusive
  const end = new Date(date.end);
  end.setDate(end.getDate() + 1);
  return { allDay, start: date.start, end: end.toISOString() };
}

function extractUrl(result: any, fieldId: string) {
  return getFieldByNameOrId(result, fieldId).url;
}

function getImageFromCover(result: any) {
  if (!("cover" in result)) return;

  if (result.cover.type === "external") return result.cover.external.url;

  return null;
}

export async function queryNotionDatabaseEvents(
  query: CalendarQuery,
  integration: NotionIntegration,
): Promise<CalendarEvent[]> {
  const path = `databases/${integration.databaseId}/query`;
  const response = await notion(path, {
    filter: {
      and: [
        {
          property: integration.dateFieldId,
          date: {
            on_or_after: query.start,
            on_or_before: query.end,
          },
        },
      ],
    },
  });

  const data = await response.json();

  console.log(data);
  const events: CalendarEvent[] = [];
  for (const result of data.results) {
    const title = extractTitle(result);
    const { start, end, allDay } = extractDate(result, integration.dateFieldId);
    const url = integration.urlFieldId
      ? extractUrl(result, integration.urlFieldId)
      : null;
    const img = getImageFromCover(result);
    events.push({ title, start, end, allDay, url, extendedProps: { img } });
  }

  return events;
}
