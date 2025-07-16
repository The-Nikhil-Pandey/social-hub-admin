import { getToken } from "./token";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function getDirectories() {
  const res = await fetch(`${API_BASE}/directory/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch directories");
  return res.json();
}

export async function getDirectory(id: string) {
  const res = await fetch(`${API_BASE}/directory/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch directory");
  return res.json();
}

export async function createDirectory(data: any) {
  let formData = new FormData();
  formData.append("place_name", data.place_name);
  formData.append("location", data.place_location);
  formData.append("location_url", data.location_url);
  formData.append("p_name", data.person_name);
  formData.append("p_email", data.person_email);
  if (data.image) formData.append("p_photo", data.image);
  if (data.status !== undefined) formData.append("status", String(data.status));
  const res = await fetch(`${API_BASE}/directory`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create directory");
  return res.json();
}

export async function updateDirectory(id: string, data: any) {
  let formData = new FormData();
  formData.append("place_name", data.place_name);
  formData.append("location", data.place_location);
  formData.append("location_url", data.location_url);
  formData.append("p_name", data.person_name);
  formData.append("p_email", data.person_email);
  if (data.image) formData.append("p_photo", data.image);
  if (data.status !== undefined) formData.append("status", String(data.status));
  const res = await fetch(`${API_BASE}/directory/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update directory");
  return res.json();
}

export async function deleteDirectory(id: string) {
  const res = await fetch(`${API_BASE}/directory/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to delete directory");
  return res.json();
}
