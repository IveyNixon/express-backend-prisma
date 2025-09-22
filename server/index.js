// ---- imports & ESM __dirname shim (once) ----
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// ---- app setup ----
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  })
);

// ---- API routes ----
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, time: new Date().toISOString() })
);
app.get("/api/greeting", (_req, res) =>
  res.json({ message: "Hello from Express 👋" })
);

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

// ---- serve built frontend (only after you run a client build) ----
app.use(express.static(path.join(__dirname, "../client/dist")));

// SPA fallback (must be last)
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ---- start server ----
app.listen(PORT, () => console.log(`API on :${PORT}`));