import { Router } from "express";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todo.controller";

const router = Router();

// @route   GET /api/todos
// @desc    Get all todos
// @access  Public
router.get("/", getAllTodos);

// @route   GET /api/todos/:id
// @desc    Get single todo by ID
// @access  Public
router.get("/:id", getTodoById);

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Public
router.post("/", createTodo);

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Public
router.put("/:id", updateTodo);

// @route   PATCH /api/todos/:id/toggle
// @desc    Toggle todo completion status
// @access  Public
router.patch("/:id/toggle", toggleTodo);

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
// @access  Public
router.delete("/:id", deleteTodo);

export default router;
