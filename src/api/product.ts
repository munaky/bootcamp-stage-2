import axios from "axios";

export const getProducts = axios.create({
  baseURL: "https://api.escuelajs.co",
});