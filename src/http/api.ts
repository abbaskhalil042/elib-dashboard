import axios from 'axios';

const api = axios.create({
    // baseURL: import.meta.env.VITE_BACKEND_URL,
    baseURL: 'http://localhost:5513',
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;


export type LoginInput = {
    email: string;
    password: string;
  };

 export type LoginResponse = {
    accessToken: string;
  };



export const login = async (data: LoginInput):Promise<LoginResponse> => {
    try {
      const response= await api.post<LoginResponse>("/api/users/login", data);
        // console.log(response)
        return response.data 
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};



export const register = async (data: {name: string; email: string; password: string }) => {
    try {
       await api.post("/api/users/register", data);
        // console.log(response) 
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}