const Assignement = require("../models/Assignement");
const Task = require("../models/Task");
const { formatValidationErrors } = require("../utils/tools");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../validation/task");
const countTasks = async (req, res) => {
  try {
    const tasksCount = await Task.countDocuments();
    res.status(200).json({ count: tasksCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const create = async (req, res) => {
  try {
    const { assignement, finish_at, start_at, is_done, content } = req.body;

    const { error } = validateCreateTask({
      assignement,
      finish_at,
      start_at,
      is_done,
      content,
    });
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }
    const newTask = new Task({
      assignement,
      finish_at,
      start_at,
      is_done,
      content,
    });
    await newTask.save();
    res.status(201).json({ message: "task created succefely", task: newTask });
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignement, finish_at, start_at, is_done, content } = req.body;

    const { error } = validateUpdateTask({
      assignement,
      finish_at,
      start_at,
      is_done,
      content,
    });
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { assignement, finish_at, start_at, is_done, content },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignement");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getOne = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignement");
    if (!task) {
      return res.status(404).json({ message: "task note fond" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, update, getAll, destroy, getOne, countTasks };
