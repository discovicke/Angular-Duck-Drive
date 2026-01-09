import express from "express";
import type { Request, Response, Application } from "express";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
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

app.listen(PORT, () => {
  console.log(`[server]: Backend API running on http://localhost:${PORT}`);
});
