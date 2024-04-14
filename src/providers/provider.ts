import axios from "axios";

export const baseURL = "https://tools.texoit.com/backend-java/api";

/**
 * Axios instance for making HTTP requests.
 */
const provider = axios.create({
  baseURL: baseURL,
  timeout: 120000,
});

export default provider;
