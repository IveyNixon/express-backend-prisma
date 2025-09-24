// client/src/lib/api.js
const API_BASE = import.meta.env.VITE_API_BASE || ''; // same origin by default

export async function getHealth() {
  const r = await fetch(`${API_BASE}/api/health`);
  return r.json();
}

export async function getTime() {
  const r = await fetch(`${API_BASE}/api/time`);
  return r.json();
}

export async function getNotes() {
  const r = await fetch(`${API_BASE}/api/notes`);
  return r.json();
}

export async function addNote(text) {
  const r = await fetch(`${API_BASE}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return r.json();
}