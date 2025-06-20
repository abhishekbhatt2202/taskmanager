import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
  singleUser,
  updateUser,
} from "../controllers/user.js";
const router = express.Router();

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", singleUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/login", login);

export default router;
