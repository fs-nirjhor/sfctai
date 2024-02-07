// website configuration

const clientUrl = import.meta.env.VITE_CLIENT_URL || window.location.origin;
const serverUrl = import.meta.env.VITE_SERVER_URL || window.location.origin; 

const coincapApi = import.meta.env.VITE_COINCAP_API_KEY || "acd9bfe0-0470-40ce-baf5-88b83f700def";

export {
  clientUrl,
  serverUrl,
  coincapApi
}
