import axios from "axios";

const apiClient = axios.create({
    baseURL: "/graphql",
});

export default apiClient;