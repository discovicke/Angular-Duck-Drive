import express from "express";
import type { Request, Response, Application } from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import "dotenv/config";

const app: Application = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    message: "API ok",
    target: FRONTEND_URL,
  });
});

app.use(
  "/",
  createProxyMiddleware({
    target: FRONTEND_URL,
    changeOrigin: true,
    ws: true,
  })
);

app.listen(PORT, () => {
  console.log(
    `[server]: Reverse proxy on http://localhost:${PORT} -> ${FRONTEND_URL}`
  );
});
