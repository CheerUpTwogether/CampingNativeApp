import axios from "axios";

const baseURL = "http://13.209.27.220:8080";

export const API = axios.create({
  baseURL,
  withCredentials: true,
});

export const OPENAPI = axios.create({
  baseURL: "http://apis.data.go.kr/B551011/GoCamping",
  withCredentials: true,
});
