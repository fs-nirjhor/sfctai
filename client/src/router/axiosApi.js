import axios from "axios";
import { serverUrl } from "../configuration/config";

/* // cookies setup
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true; */

// bearer token setup
const accessToken = localStorage.getItem("accessToken");
const headers = { Authorization: `Bearer ${accessToken}` };

const authApi = axios.create({ baseURL: `${serverUrl}/api/auth/`, headers });
const userApi = axios.create({ baseURL: `${serverUrl}/api/users/`, headers });
const transactionApi = axios.create({
  baseURL: `${serverUrl}/api/transactions/`,
  headers,
});
const configurationApi = axios.create({
  baseURL: `${serverUrl}/api/configuration/`,
  headers,
});

const allApi = axios.create({
  baseURL: `${serverUrl}/api/`,
  headers,
});

export { userApi, authApi, transactionApi, configurationApi, allApi };
