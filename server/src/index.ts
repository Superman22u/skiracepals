import "./env";
import cookieParser from "cookie-parser";
import express, { type NextFunction, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { migrate } from "./db";
import { authRouter } from "./routes/auth";
import { catalogRouter } from "./routes/catalog";
import { ensureAdmin, seedIfEmpty, seedPriorIfEmpty } from "./seed";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});
app.use("/api/auth", authRouter);
app.use("/api", catalogRouter);

const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/dist");
if (process.env.NODE_ENV === "production" && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      next();
      return;
    }
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: "Something went wrong" });
});

const port = Number(process.env.PORT ?? 3001);

try {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  await migrate();
  await seedIfEmpty();
  await seedPriorIfEmpty();
  await ensureAdmin();
  app.listen(port, "0.0.0.0", () => {
    console.log(`Ski Race Pals API on http://localhost:${port}`);
  });
} catch (error) {
  console.error("\nCould not start. MariaDB needs the skirace database.");
  console.error('Run: & "C:\\Program Files\\MariaDB 12.2\\bin\\mariadb.exe" -u root -p < server\\sql\\setup-db.sql');
  console.error(error);
  process.exit(1);
}
