// client/src/lib/api.js
export async function getHealth() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/health`);
  if (!res.ok) throw new Error('health failed');
  return res.json();
}

export async function getNotes() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`);
  if (!res.ok) throw new Error('notes failed');
  return res.json();
}

export async function addNote(text) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('create failed');
  return res.json();
}

export async function getTime() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/time`);
  if (!res.ok) throw new Error('time failed');
  return res.json();
}