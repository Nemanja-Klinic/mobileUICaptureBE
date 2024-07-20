require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./models/project");
const Cell = require("./models/cell");
const Task = require("./models/task");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(async () => {
    console.log("Connected to the database");

    // sample project
    const project = new Project({
      name: "Sample Project",
    });
    await project.save();

    // sample cells
    const cell1 = new Cell({
      name: "Cell 1",
      next_url: "https://www.amazon.com/",
      projectId: project._id,
    });
    await cell1.save();

    const cell2 = new Cell({
      name: "Cell 2",
      next_url: "https://www.kroger.com/",
      projectId: project._id,
    });
    await cell2.save();

    //  sample tasks
    const task1 = new Task({
      name: "Task 1",
      url: "https://www.amazon.com/",
      description: "This is task 1 description.",
      cellId: cell1._id, // Assign cellId for task1
    });
    await task1.save();

    const task2 = new Task({
      name: "Task 2",
      url: "https://www.kroger.com/",
      description: "This is task 2 description.",
      cellId: cell2._id, // Assign cellId for task2
    });
    await task2.save();

    console.log("Dummy data created successfully");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
