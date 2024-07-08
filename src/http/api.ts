import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL,
  baseURL: "http://localhost:5513",
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

export const login = async (data: LoginInput): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/api/users/login", data);
    // console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  accessToken: string;
};
export const register = async (
  data: RegisterInput
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      "/api/users/register",
      data
    );
    // console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
