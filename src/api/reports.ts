export const updateReport = async (
  id: string | number,
  r_status: string,
  action: string
) => {
  const token = getToken();
  const res = await axios.patch(
    `${BASE_URL}/reports/${id}`,
    { r_status, action },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
import axios from "axios";
import { getToken } from "./token";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getReports = async () => {
  const token = getToken();
  const res = await axios.get(`${BASE_URL}/reports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
