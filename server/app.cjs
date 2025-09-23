// server/app.cjs
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// env
const PORT = process.env.PORT || 8080;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// middleware
app.use(cors({ origin: [ALLOWED_ORIGIN], credentials: false }));
app.use(express.json());

// root
app.get('/', (_req, res) => {
  res.send('API is running 🚀');
});

// health
app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, message: 'Server is healthy 🛠️' });
});

// current time (helpful for quick connectivity tests)
app.get('/api/time', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// NOTES — Prisma backed
app.get('/api/notes', async (_req, res) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(notes);
  } catch (err) {
    console.error('GET /api/notes error:', err);
    res.status(500).json({ ok: false, error: 'Failed to fetch notes' });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ ok: false, error: 'text is required' });
    }
    const note = await prisma.note.create({ data: { text } });
    res.status(201).json(note);
  } catch (err) {
    console.error('POST /api/notes error:', err);
    res.status(500).json({ ok: false, error: 'Failed to create note' });
  }
});

// (optional) delete for testing
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.note.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/notes/:id error:', err);
    res.status(500).json({ ok: false, error: 'Failed to delete note' });
  }
});

// start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});