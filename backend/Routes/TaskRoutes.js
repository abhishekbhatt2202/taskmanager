import express from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  editTask,
} from "../controllers/task.js";
const router = express.Router();

router.post("/create", createTask);

router.post("/get", getTasks);

router.delete("/delete", deleteTask);

router.put("/put", editTask);

export default router;
