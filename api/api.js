import axios from "axios";

const api = axios.create({
  // baseURL:
  // "https://41d1-2402-4000-b1c0-c18a-7cea-7d41-a716-9198.ngrok-free.app/scope-backend-93b9d/us-central1/app",
  baseURL: "https://us-central1-scope-backend-93b9d.cloudfunctions.net/app",
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

export default api;
