import axios from "axios";

const API_URL = "localhost:8000"; // Замени на реальный URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
