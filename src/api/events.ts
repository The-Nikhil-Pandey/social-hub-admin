const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEvents = async () => {
  const res = await fetch(`${BASE_URL}/event`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

export const getEventById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/event/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};

export const createEvent = async (data: any) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });
  const res = await fetch(`${BASE_URL}/event`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
};

export const updateEvent = async (id: string, data: any) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });
  const res = await fetch(`${BASE_URL}/event/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update event");
  return res.json();
};

export const deleteEvent = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/event/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete event");
  return res.json();
};
