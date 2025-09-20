const cors = require('cors');
app.use(cors());
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Updated message: this is coming from the new server 🔥');
});

// New route
app.get('/about', (req, res) => {
  res.send('About Page: This is running 🚀');
});

// Simple API route
app.get('/api/message', (_req, res) => {
  res.json({ ok: true, message: 'Hello from Express 🔥' });
});

app.get('/api/time', (_req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
