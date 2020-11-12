import { getEndpoint } from "./utils";

export default async function() {
  const endpoint = getEndpoint("getGames");

  try {
    const res = await fetch(endpoint)
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
