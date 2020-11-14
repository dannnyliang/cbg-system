import { getEndpoint } from "./utils";

export default async function(payload) {
  const endpoint = getEndpoint("createGame");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        variables: { payload },
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
