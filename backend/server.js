import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import healthRoutes from "./routes/healthRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);

// Connect to MongoDB, then start the server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
