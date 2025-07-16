import axios from "axios";
import { getToken } from "./token";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTools = async () => {
  const token = getToken();
  const res = await axios.get(`${BASE_URL}/tools`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchToolById = async (id: number | string) => {
  const token = getToken();
  const res = await axios.get(`${BASE_URL}/tools/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTool = async (data: FormData) => {
  const token = getToken();
  const res = await axios.post(`${BASE_URL}/tools`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateTool = async (id: number | string, data: FormData) => {
  const token = getToken();
  const res = await axios.patch(`${BASE_URL}/tools/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteTool = async (id: number | string) => {
  const token = getToken();
  const res = await axios.delete(`${BASE_URL}/tools/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
