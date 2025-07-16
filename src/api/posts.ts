const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}/post/`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const getPostById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/post/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};

export const deletePost = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/post/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};
