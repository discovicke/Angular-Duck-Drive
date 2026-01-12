import express from "express";
import type { Request, Response, Application } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";

const app: Application = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    message: "API ok",
    timestamp: new Date().toISOString(),
  });
});

// Add more API-endpoints here
app.get("/api/data", (req: Request, res: Response) => {
  res.json({
    items: ["Item 1", "Item 2", "Item 3"],
  });
});

app.get("/api/files", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "..", "db.json");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(400).json({ error: "Failed to read file metadata." });
    }
  });
});

app.listen(PORT, () => {
  console.log(`[server]: Backend API running on http://localhost:${PORT}`);
});
