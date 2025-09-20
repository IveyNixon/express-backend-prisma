const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// routes
app.get('/', (_req, res) => {
  res.send('Updated message: this is coming from the new server 🚀');
});

app.get('/about', (_req, res) => {
  res.send('About Page: This is running 🎯');
});

app.get('/api/message', (_req, res) => {
  res.json({ ok: true, message: 'Hello from Express 🔥' });
});

app.get('/api/time', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
