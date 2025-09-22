import axios from "axios";

// In dev, Vite proxy sends /api → http://localhost:8080
const api = axios.create({ baseURL: "/api" });

export const getGreeting = async () => {
  const { data } = await api.get("/greeting");
  return data;
};

export const getServerTime = async () => {
  const { data } = await api.get("/health");
  return data.time; // ISO string
};

// --- Notes ---
export const listNotes = async () => {
  const { data } = await api.get("/notes");
  return data; // [{id, text, createdAt}]
};

export const createNote = async (text) => {
  const { data } = await api.post("/notes", { text });
  return data; // created note
};

export const deleteNote = async (id) => {
  await api.delete(`/notes/${id}`);
};