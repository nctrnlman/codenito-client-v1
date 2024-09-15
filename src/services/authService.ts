import axios, { AxiosError } from "axios";
import { LoginResponse } from "../types/authTypes";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};
