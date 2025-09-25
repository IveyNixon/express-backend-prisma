const API_URL = import.meta.env.VITE_API_URL;

export const getHealth = async () => {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
};

export const addNote = async (text) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
};