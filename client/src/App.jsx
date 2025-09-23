// client/src/App.jsx
import { useEffect, useState } from 'react';
import { getHealth, getNotes, addNote, getTime } from './lib/api';

export default function App() {
  const [health, setHealth] = useState(null);
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [time, setTime] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getHealth().then(setHealth).catch((e) => setError(e.message));
    refreshNotes();
  }, []);

  async function refreshNotes() {
    try {
      const n = await getNotes();
      setNotes(n);
    } catch (e) {
      setError(e.message);
    }
  }

  async function onAdd() {
    if (!text.trim()) return;
    setBusy(true);
    setError('');
    try {
      await addNote(text.trim());
      setText('');
      await refreshNotes();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function onGetTime() {
    try {
      const t = await getTime();
      setTime(t.time);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', color: '#e8e8e8', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 48, marginBottom: 8 }}>Client ↔ API check</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        Backend says: {health ? '✅ healthy' : '⚠️ unreachable'}
      </p>

      <button onClick={onGetTime} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #333' }}>
        Get Server Time
      </button>
      {time && <div style={{ marginTop: 8, opacity: 0.9 }}>Server time: {time}</div>}

      <h2 style={{ marginTop: 32, fontSize: 28 }}>Notes</h2>

      <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note…"
          style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #333', background: '#111', color: '#eee' }}
        />
        <button disabled={busy} onClick={onAdd} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #333' }}>
          {busy ? 'Adding…' : 'Add'}
        </button>
      </div>

      {error && <div style={{ color: '#ff8a8a', marginBottom: 8 }}>Error: {error}</div>}

      <pre style={{ background: '#0b0b0b', padding: 12, borderRadius: 10 }}>
        {JSON.stringify(notes, null, 2)}
      </pre>
    </main>
  );
}