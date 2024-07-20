const { v4: uuidv4 } = require("uuid");
const Tester = require("../models/tester");
const Project = require("../models/project");
const Cell = require("../models/cell");

const getTesterExperience = async (req, res) => {
  const { project_name, cell_name } = req.query;
  console.log("🚀 ~ getTesterExperience ~ cell_name:", cell_name);
  console.log("🚀 ~ getTesterExperience ~ project_name:", project_name);

  try {
    // Generate a UUID for the tester
    const tester_id = uuidv4();
    console.log("🚀 ~ getTesterExperience ~ tester id:", tester_id);
    const newTester = new Tester({ tester_id });
    await newTester.save();

    // Find the project by name
    const project = await Project.findOne({ name: project_name }).populate(
      "cells"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Find the cell within the project by name and populate tasks
    const cell = await Cell.findOne({
      name: cell_name,
      projectId: project._id,
    }).populate("tasks");

    if (!cell) {
      return res.status(404).json({ message: "Cell not found" });
    }

    res.json({
      tester_id,
      project,
      cell,
    });
  } catch (error) {
    console.error("Error creating tester or finding project and cell:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getTesterExperience };
