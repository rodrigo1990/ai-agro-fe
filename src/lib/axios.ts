import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:80", // your Laravel backend
    withCredentials: true, // equivalent to axios.defaults.withCredentials = true
    withXSRFToken: true,   // Laravel 11+/12 supports this
});

export default api;