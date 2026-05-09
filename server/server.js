import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import authRoutes       from "./routes/auth.js";
import projectRoutes    from "./routes/projects.js";
import skillRoutes      from "./routes/skills.js";
import experienceRoutes from "./routes/experience.js";
import freelanceRoutes  from "./routes/freelance.js";
import viewsRoutes      from "./routes/views.js";
import { startKeepalive } from "./keepalive.js";

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  credentials: true,
}));

app.use(express.json());

// Rate limit login to 10 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/",       (req, res) => res.json({ status: "Portfolio API running" }));
app.get("/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));

app.use("/api/auth/login", loginLimiter);
app.use("/api/auth",       authRoutes);
app.use("/api/projects",   projectRoutes);
app.use("/api/skills",     skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/freelance",  freelanceRoutes);
app.use("/api/views",      viewsRoutes);

// Global error handler — catches any unhandled errors from route handlers
app.use((err, req, res, next) => {
  console.error("[error]", err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV === "production") {
    startKeepalive();
  }
});