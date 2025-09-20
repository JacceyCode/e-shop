export const constructProxyImageUrl = (url) => {
  const server_url = import.meta.env.VITE_BACK_END_URL;

  if (url.startsWith(server_url)) {
    return url.replace(server_url, "");
  }
  return url;
};
