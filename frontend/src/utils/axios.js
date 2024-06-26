import axios from "axios";

export const baseURL = axios.create({
  baseURL : import.meta.env.VITE_AXIOS_ORIGIN
})