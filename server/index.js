// ---- ESM path helpers ----
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- deps ----
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// ---- env & app ----
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

// JSON body parser first
app.use(express.json());

// ---- CORS (dev + prod allowlist) ----
const allowlist = new Set(
  [
    "http://localhost:5173",
    process.env.ALLOWED_ORIGIN, // e.g. https://react-project-cb70.onrender.com
  ].filter(Boolean)
);

app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin/no-origin requests (SSR/health) and allowlisted origins
      if (!origin || allowlist.has(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
  })
);

// (optional) tiny logger to help Render logs during first run
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ---- API routes (must be BEFORE static + SPA fallback) ----
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, time: new Date().toISOString() })
);

app.get("/api/greeting", (_req, res) =>
  res.json({ message: "Hello from Express 👋" })
);

app.get("/api/notes", async (_req, res, next) => {
  try {
    const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });
    res.json(notes);
  } catch (e) {
    next(e);
  }
});

app.post("/api/notes", async (req, res, next) => {
  try {
    const note = await prisma.note.create({
      data: { text: req.body?.text ?? "" },
    });
    res.status(201).json(note);
  } catch (e) {
    next(e);
  }
});

app.delete("/api/notes/:id", async (req, res, next) => {
  try {
    await prisma.note.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

// ---- serve built frontend (after `client` build) ----
app.use(express.static(path.join(__dirname, "../client/dist")));

// SPA fallback (keep last)
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ---- basic error handler (JSON) ----
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "server_error" });
});

// ---- start ----
app.listen(PORT, () => console.log(`API listening on :${PORT}`));