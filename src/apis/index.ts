import axios from "axios";

const baseURL = "http://13.209.27.220:8080";

export const API = axios.create({
  baseURL,
  withCredentials: true,
});
