const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function getHealth() {
  const r = await fetch(`${API_URL}/health`, { headers: { 'Accept': 'application/json' }});
  if (!r.ok) throw new Error(`health failed: ${r.status}`);
  return r.json();
}

export async function getNotes() {
  const r = await fetch(`${API_URL}/notes`, { headers: { 'Accept': 'application/json' }});
  if (!r.ok) throw new Error(`notes list failed: ${r.status}`);
  return r.json();
}

export async function createNote(text) {
  const r = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!r.ok) throw new Error(`create failed: ${r.status}`);
  return r.json();
}