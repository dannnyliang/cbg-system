import { getEndpoint } from "./utils";

export default async function(id) {
  const endpoint = getEndpoint("removeGame");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        variables: { id },
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
