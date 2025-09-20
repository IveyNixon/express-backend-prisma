import { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || '';
// ...
fetch(`${API_BASE}/api/message`)
// ...
fetch(`${API_BASE}/api/time`)

export default function App() {
  const [msg, setMsg] = useState('loading…');
  const [time, setTime] = useState(null);
  const [loadingTime, setLoadingTime] = useState(false);
  const [timeErr, setTimeErr] = useState(null);

  // On load: fetch the greeting from your API
  useEffect(() => {
    fetch(`${API}/api/message`)
      .then(r => r.json())
      .then(data => setMsg(data.message))
      .catch(() => setMsg('Error contacting backend'));
  }, []);

  const getTime = () => {
    setLoadingTime(true);
    setTimeErr(null);
    fetch(`${API}/api/time`)
      .then(r => r.json())
      .then(data => setTime(data.time))
      .catch(() => setTimeErr('Could not get time'))
      .finally(() => setLoadingTime(false));
  };

  return (
    <div style={{ padding: 24, fontSize: 22, lineHeight: 1.4 }}>
      <div><strong>React is running ✅</strong></div>
      <div>Backend says: <strong>{msg}</strong></div>
      <br />
      <button onClick={getTime} disabled={loadingTime}>
        {loadingTime ? 'Loading...' : 'Get server time'}
      </button>
      <div>
        {timeErr && <span style={{ color: 'red' }}>{timeErr}</span>}
        {time && <span>Server time (ISO): {time}</span>}
      </div>
    </div>
  );
}
