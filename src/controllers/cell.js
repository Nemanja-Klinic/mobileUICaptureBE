const Cell = require("../models/cell");
const Project = require("../models/project");

const createCell = async (req, res) => {
  const { name, projectId, tasks, next_url } = req.body;

  try {
    // Create the new cell
    const newCell = new Cell({ name, projectId, tasks, next_url });
    const savedCell = await newCell.save();

    // Add the cell to the project's cells array
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $push: { cells: savedCell._id } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(201).json(savedCell);
  } catch (error) {
    console.error("Error creating cell:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllCells = async (req, res) => {
  try {
    const cells = await Cell.find();
    res.json(cells);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCellById = async (req, res) => {
  try {
    const cell = await Cell.findById(req.params.id);
    if (!cell) return res.status(404).json({ error: "Cell not found" });
    res.json(cell);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCell = async (req, res) => {
  const { id } = req.params;
  const { name, projectId, tasks, next_url } = req.body;

  try {
    // Update the cell
    const updatedCell = await Cell.findByIdAndUpdate(
      id,
      { name, projectId, tasks, next_url },
      { new: true }
    );

    if (!updatedCell) {
      console.log("Cell not found");
      return res.status(404).json({ message: "Cell not found" });
    }

    // Ensure the project includes the updated cell in the cells array
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.cells.includes(id)) {
      project.cells.push(id);
      await project.save();
    }

    res.json(updatedCell);
  } catch (error) {
    console.error("Error updating cell:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteCell = async (req, res) => {
  const { cellId } = req.params;

  try {
    // Find the cell by id
    const cell = await Cell.findById(cellId);

    if (!cell) {
      return res.status(404).json({ message: "Cell not found" });
    }

    // Find projects that contain the cell
    const projects = await Project.find({ cells: cellId });

    // Update each project to remove the cell from cells array
    for (let project of projects) {
      await Project.findByIdAndUpdate(
        project._id,
        { $pull: { cells: cellId } },
        { new: true }
      );
    }

    // Remove the cell
    await Cell.findByIdAndDelete(cellId);

    res.status(200).json({ message: "Cell deleted successfully" });
  } catch (error) {
    console.error("Error deleting cell:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createCell,
  getAllCells,
  getCellById,
  updateCell,
  deleteCell,
};
