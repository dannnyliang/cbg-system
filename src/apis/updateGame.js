import { getEndpoint } from "./utils";

export default async function(id, payload) {
  const endpoint = getEndpoint("updateGame");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        variables: { id, payload },
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
