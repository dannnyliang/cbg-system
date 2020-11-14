import { getEndpoint } from "./utils";

export default async function(id) {
  const endpoint = getEndpoint("getGame");

  try {
    const res = await fetch(`${endpoint}?id=${id}`)
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
