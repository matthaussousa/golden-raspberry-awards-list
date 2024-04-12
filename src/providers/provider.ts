import axios from "axios";

const provider = axios.create({
  baseURL: "https://tools.texoit.com/backend-java/api",
  timeout: 120000,
});

export default provider;
