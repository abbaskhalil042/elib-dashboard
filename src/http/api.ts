import axios from 'axios';

const api = axios.create({
    // baseURL: import.meta.env.VITE_BACKEND_URL,
    baseURL: 'http://localhost:5513',
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

// console.log(api);

export const login = async (data: { email: string; password: string }) => {
    try {
       await api.post("/api/users/login", data);
        // console.log(response) 
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
