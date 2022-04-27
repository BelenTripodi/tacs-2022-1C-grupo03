import axios from "axios";

const apiURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/";

const jwt = localStorage.getItem("jwt") || "";

const httpClient = axios.create({
  baseURL: apiURL,
  headers: {
    "Authorization": `Bearer ${jwt}`
  }
});

export default httpClient;
