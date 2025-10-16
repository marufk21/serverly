import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./config/database";
import todoRoutes from "./routes/todo.routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Todo API 🚀",
    version: "1.0.0",
    endpoints: {
      todos: "/api/todos",
    },
  });
});

// Notes CRUD API Routes
app.use("/api/todos", todoRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`server-express running at http://localhost:${PORT}`);
});
