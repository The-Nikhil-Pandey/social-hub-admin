import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getTopics = async (token) => {
  return axios.get(`${API_URL}/topic`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTopicById = async (id, token) => {
  return axios.get(`${API_URL}/topic/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTopic = async (formData, token) => {
  return axios.post(`${API_URL}/topic`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTopic = async (id, formData, token) => {
  return axios.patch(`${API_URL}/topic/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTopic = async (id, token) => {
  return axios.delete(`${API_URL}/topic/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
