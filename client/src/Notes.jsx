import { useEffect, useState } from "react";
import { listNotes, createNote, deleteNote } from "./api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      setNotes(await listNotes());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await createNote(text.trim());
    setText("");
    await refresh();
  };

  const onDelete = async (id) => {
    await deleteNote(id);
    await refresh();
  };

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ fontSize: 22, marginBottom: 12 }}>Notes</h2>

      <form onSubmit={onAdd} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note…"
          style={{ padding: 8, flex: 1, borderRadius: 8, border: "1px solid #555", background: "#111", color: "#eee" }}
        />
        <button type="submit" style={{ padding: "8px 12px", borderRadius: 8 }}>
          Add
        </button>
      </form>

      {loading ? <p>Loading…</p> : (
        notes.length ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {notes.map(n => (
              <li key={n.id} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "10px 12px",
                border: "1px solid #333", borderRadius: 10, marginBottom: 8
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{n.text}</div>
                  <div style={{ opacity: 0.7, fontSize: 12 }}>
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
                <button onClick={() => onDelete(n.id)} style={{ padding: "6px 10px", borderRadius: 8 }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : <p>No notes yet.</p>
      )}
    </section>
  );
}