import axios from "axios";

const api = axios.create({
  //   baseURL: "http://127.0.0.1:5001/scope-backend-93b9d/us-central1/app",
  baseURL: "https://us-central1-scope-backend-93b9d.cloudfunctions.net/app",
});

export default api;
