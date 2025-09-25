// client/src/lib/api.js
const BASE = import.meta.env.VITE_API_URL || '/api';

// health → returns { ok, time }
export async function getHealth() {
  const r = await fetch(`${BASE}/health`, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`health failed: ${r.status}`);
  return r.json();
}

// notes list → returns Note[]
export async function getNotes() {
  const r = await fetch(`${BASE}/notes`, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`notes failed: ${r.status}`);
  return r.json();
}

// create note → returns created Note
export async function addNote(text) {
  const r = await fetch(`${BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!r.ok) throw new Error('create failed');
  return r.json();
}

// “Get Server Time” in App.jsx expects an object with { time }
export async function getTime() {
  const { time } = await getHealth(); // use /api/health so we actually have a time
  return { time };
}