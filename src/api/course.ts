import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getCourses = async (token) => {
  return axios.get(`${API_URL}/course`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCourseById = async (id, token) => {
  return axios.get(`${API_URL}/course/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createCourse = async (formData, token) => {
  return axios.post(`${API_URL}/course`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCourse = async (id, formData, token) => {
  return axios.patch(`${API_URL}/course/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCourse = async (id, token) => {
  return axios.delete(`${API_URL}/course/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
