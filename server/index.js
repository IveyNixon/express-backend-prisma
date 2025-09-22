// server/index.js (sketch)
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.get("/api/greeting", (_req, res) => res.json({ message: "Hello from Express 👋" }));

app.get("/api/notes", async (_req, res) => {
  const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });
  res.json(notes);
});
app.post("/api/notes", async (req, res) => {
  const note = await prisma.note.create({ data: { text: req.body.text ?? "" } });
  res.status(201).json(note);
});
app.delete("/api/notes/:id", async (req, res) => {
  await prisma.note.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});

app.listen(PORT, () => console.log(`API on :${PORT}`));