import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Growora API is running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/journal", journalRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
