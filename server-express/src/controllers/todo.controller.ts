import { Request, Response } from "express";
import Todo, { ITodo } from "../models/todo.model";

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      completed,
      priority,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filter object
    const filter: any = {};
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }
    if (priority) {
      filter.priority = priority;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === "desc" ? -1 : 1;

    const todos = await Todo.find(filter).sort(sort);

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Public
export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, priority = "medium", dueDate } = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        message: "Title is required",
      });
      return;
    }

    const todoData: Partial<ITodo> = {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };

    const todo = await Todo.create(todoData);

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      success: false,
      message: "Error creating todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined)
      updateData.dueDate = dueDate ? new Date(dueDate) : null;

    const todo = await Todo.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({
      success: false,
      message: "Error updating todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// @desc    Toggle todo completion status
// @route   PATCH /api/todos/:id/toggle
// @access  Public
export const toggleTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error toggling todo:", error);
    res.status(500).json({
      success: false,
      message: "Error toggling todo",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
