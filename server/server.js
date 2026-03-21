import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes       from "./routes/auth.js";
import projectRoutes    from "./routes/projects.js";
import skillRoutes      from "./routes/skills.js";
import experienceRoutes from "./routes/experience.js";
import freelanceRoutes  from "./routes/freelance.js";
import viewsRoutes      from "./routes/views.js";

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

app.get("/",       (req, res) => res.json({ status: "Portfolio API running" }));
app.get("/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));

app.use("/api/auth",       authRoutes);
app.use("/api/projects",   projectRoutes);
app.use("/api/skills",     skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/freelance",  freelanceRoutes);
app.use("/api/views",      viewsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));