require('dotenv').config();
// server/app.cjs
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// ===== ENV =====
const PORT = process.env.PORT || 8080;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// ===== MIDDLEWARE =====
app.use(cors({ origin: [ALLOWED_ORIGIN], credentials: false }));
app.use(express.json());

// ===== API ROUTES FIRST (so catch-all doesn't steal them) =====

// root
app.get('/', (_req, res) => {
  res.send('API is running 🚀');
});

// health
app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, message: 'Server is healthy 🛠️' });
});

// current time
app.get('/api/time', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// notes
app.get('/api/notes', async (_req, res) => {
  try {
    const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { text } = req.body;
    const newNote = await prisma.note.create({ data: { text } });
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// ===== SERVE VITE BUILD (after APIs) =====
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));

// SPA fallback — but only after API routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// ===== START =====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});