const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function getHealth() {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
}

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes`);
  return res.json();
}

export async function addNote(text) {
  const res = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return res.json();
}

export async function getTime() {
  const res = await fetch(`${API_URL}/greeting`);
  return res.json();
}