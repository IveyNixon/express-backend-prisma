const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

<<<<<<< HEAD:server/app.js
// routes
app.get('/', (_req, res) => {
  res.send('Updated message: this is coming from the new server 🚀');
=======
// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Updated message: this is coming from the new server 🔥');
>>>>>>> 45df9f7 (Update express-backend With Latest Changes):app.js
});

app.get('/about', (_req, res) => {
  res.send('About Page: This is running correctly ✨');
});

app.get('/api/message', (_req, res) => {
  res.json({ ok: true, message: 'Hello from Express 🔥' });
});

app.get('/api/time', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// ✅ Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, message: 'Server is healthy 🚀' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
