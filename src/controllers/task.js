const Task = require("../models/task");

const createTask = async (req, res) => {
  const { name, description, cellId, url } = req.body;

  try {
    // Create a new task
    const newTask = new Task({
      name,
      description,
      cellId,
      url,
    });
    const savedTask = await newTask.save();

    // Update the cell by adding the task to the tasks array
    const updatedCell = await Cell.findByIdAndUpdate(
      cellId,
      { $push: { tasks: savedTask._id } },
      { new: true }
    );

    if (!updatedCell) {
      return res.status(404).json({ message: "Cell not found" });
    }

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, cellId, url } = req.body;

  try {
    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, description, cellId, url },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // If the cellId has changed, update the related cells
    if (cellId && updatedTask.cellId.toString() !== cellId) {
      // Remove the task from the old cell
      await Cell.findByIdAndUpdate(
        updatedTask.cellId,
        { $pull: { tasks: id } },
        { new: true }
      );

      // Add the task to the new cell
      await Cell.findByIdAndUpdate(
        cellId,
        { $push: { tasks: id } },
        { new: true }
      );
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find the task by id
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Find the cell by id
    const cell = await Cell.findById(task.cellId);

    // Check if the task is in the cell's tasks array
    if (cell && cell.tasks.includes(taskId)) {
      // Remove the task reference from the cell's tasks array
      await Cell.findByIdAndUpdate(
        task.cellId,
        { $pull: { tasks: taskId } },
        { new: true }
      );
    }

    // Remove the task
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
