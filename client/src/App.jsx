import { useEffect, useState } from "react";
import { getGreeting, getServerTime } from "./api";
import Notes from "./Notes";

export default function App() {
  const [msg, setMsg] = useState("loading…");
  const [serverTime, setServerTime] = useState("");

  useEffect(() => {
    getGreeting()
      .then((d) => setMsg(d.message))
      .catch(() => setMsg("▲ backend unreachable"));
  }, []);

  const handleTime = async () => {
    try {
      const iso = await getServerTime();
      setServerTime(new Date(iso).toLocaleString());
    } catch {
      setServerTime("error");
    }
  };

  return (
    <main style={{ fontFamily: "system-ui", padding: 24, maxWidth: 600 }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>My Site</h1>
      <p>Backend says: {msg} 👋</p>

      <button onClick={handleTime} style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10 }}>
        Get Server Time
      </button>
      {serverTime && <p style={{ marginTop: 8 }}>Server Time: {serverTime}</p>}

      <Notes />
    </main>
  );
}