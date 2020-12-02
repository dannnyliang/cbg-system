import { isProd } from "../utils";

export function getEndpoint(functionName) {
  const {
    VUE_APP_API_PORT,
    VUE_APP_FIREBASE_REGION,
    VUE_APP_FIREBASE_PROJECT_NAME,
  } = process.env;
  return isProd()
    ? `https://${VUE_APP_FIREBASE_REGION}-${VUE_APP_FIREBASE_PROJECT_NAME}.cloudfunctions.net/${functionName}`
    : `http://localhost:${VUE_APP_API_PORT}/${VUE_APP_FIREBASE_PROJECT_NAME}/${VUE_APP_FIREBASE_REGION}/${functionName}`;
}

export function getUploadFileEndpoint(prefix) {
  return `${getEndpoint("uploadFile")}?prefix=${isProd() ? prefix : "dev"}`;
}
