const secret = process.env.NOTION_CLIENT_SECRET;

export function notion(
  endpoint: string,
  body: object,
  method: string = "POST",
) {
  return fetch(`https://api.notion.com/v1/${endpoint}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${secret}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  });
}
