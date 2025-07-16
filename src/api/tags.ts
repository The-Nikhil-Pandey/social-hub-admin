const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTags = async () => {
  const res = await fetch(`${BASE_URL}/tags/`);
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
};

export const getTagById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/tags/${id}`);
  if (!res.ok) throw new Error("Failed to fetch tag");
  return res.json();
};

export const createTag = async (data: {
  name: string;
  description: string;
}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/tag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create tag");
  return res.json();
};

export const updateTag = async (
  id: string,
  data: { name: string; description: string }
) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/tags/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update tag");
  return res.json();
};

export const deleteTag = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/tags/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete tag");
  return res.json();
};
