import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`);
  return response.data;
};
