import axios from "axios";
import { serverUrl } from "../data/config";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const authApi = axios.create({ baseURL: `${serverUrl}/api/auth/` });
const userApi = axios.create({ baseURL: `${serverUrl}/api/users/` });
const transactionApi = axios.create({
  baseURL: `${serverUrl}/api/transactions/`,
});
const configurationApi = axios.create({
  baseURL: `${serverUrl}/api/configuration/`,
});

const allApi = axios.create({
  baseURL: `${serverUrl}/api/`,
});

export { userApi, authApi, transactionApi, configurationApi, allApi };
