import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // Set the base URL for your API
    withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
});

export default apiClient;
