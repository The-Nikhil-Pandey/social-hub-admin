import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getLessons = async (token) => {
  return axios.get(`${API_URL}/lession`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getLessonById = async (id, token) => {
  return axios.get(`${API_URL}/lession/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createLesson = async (data, token) => {
  return axios.post(`${API_URL}/lession`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateLesson = async (id, data, token) => {
  return axios.patch(`${API_URL}/lession/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteLesson = async (id, token) => {
  return axios.delete(`${API_URL}/lession/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
