const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const verifyToken = async (token: string) => {
  const res = await fetch(`${BASE_URL}/verify-token`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
};
