// client/src/api.js
export async function getNotes() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

export async function getHealth() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/health`);
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
}

export async function createNote(data) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Create failed: ${msg || res.status}`);
  }
  return res.json();
}