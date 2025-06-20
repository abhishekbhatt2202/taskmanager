import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const { email } = req.body;
    const tasks = await Task.find({ email });
    res.status(200).json({ data: tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  const { email, title } = req.body;

  if (!email || !title) {
    return res.status(400).json({ message: "Email and Title are required" });
  }

  const newTask = new Task({ email, title });

  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { email, title } = req.body;
  if (!email || !title) {
    return res.status(400).json({ message: "Email and Title required" });
  }
  try {
    const deletedTask = await Task.findOneAndDelete({ email, title });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted", deletedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editTask = async (req, res) => {
  const { email, oldTitle, updatedTitle } = req.body;

  if (!email || !oldTitle || !updatedTitle) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { email, title: oldTitle }, // ← use oldTitle here
      { title: updatedTitle },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ data: updatedTask }); // send it properly
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
