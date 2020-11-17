import { getEndpoint } from "./utils";

export default async function(filePath) {
  const endpoint = getEndpoint("removeFile");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        variables: { filePath },
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
