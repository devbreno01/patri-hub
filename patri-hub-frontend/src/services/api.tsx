import axios from 'axios';

const api = axios.create({
    baseURL: 'https://patrihub-api.onrender.com/api'
});

export default api; 