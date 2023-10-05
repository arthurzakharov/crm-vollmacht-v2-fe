import axios from "axios";

const TIMEOUT = 10000;

export const MOCK = axios.create({
  baseURL: "http://localhost:3334",
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const HTTPS_INIT = axios.create({
  baseURL: "/",
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const HTTPS = axios.create({
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const HTTPS_MULTIPART = axios.create({
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
