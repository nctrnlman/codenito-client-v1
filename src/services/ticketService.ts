import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTickets = async (page: number, limit: number) => {
  try {
    const token = localStorage.getItem("token");

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(
      `${API_URL}/tickets?page=${page}&limit=${limit}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};
