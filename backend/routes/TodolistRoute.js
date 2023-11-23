import express from "express";
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controllers/TodolistController.js";

const router = express.Router();

router.get('/tasks', getTask);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;