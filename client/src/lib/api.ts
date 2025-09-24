// client/src/lib/api.ts
export async function getNotes() {
  const res = await fetch(`/api/notes`);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

export async function createNote(text: string) {
  const res = await fetch(`/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('create failed');
  return res.json();
}