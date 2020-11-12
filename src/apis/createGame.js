import { getEndpoint } from "./utils";

const payloadTransformer = (formValues) => ({
  ...formValues,
  minPlayer: Number(formValues.minPlayer),
  maxPlayer: Number(formValues.maxPlayer),
});

export default async function(formValues) {
  const endpoint = getEndpoint("createGame");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        variables: { payload: payloadTransformer(formValues) },
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
