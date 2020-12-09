export function isProd() {
  return process.env.NODE_ENV === "production";
}

export function getFileListFromFileInfo(fileInfoList) {
  return fileInfoList.map((fileInfo, index) => ({
    uid: `${index}`,
    name: fileInfo.name ?? "",
    status: "done",
    url: fileInfo.url,
    response: {
      url: fileInfo.url,
    },
  }));
}
