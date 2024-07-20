const express = require("express");
const router = express.Router();

const projectRouter = require("./project");
const cellRouter = require("./cell");
const taskRouter = require("./task");
const kpiRouter = require("./kpi");
const testerRouter = require("./tester");

router.use("/projects", projectRouter);
router.use("/cells", cellRouter);
router.use("/tasks", taskRouter);
router.use("/kpis", kpiRouter);
router.use("/tester", testerRouter);

module.exports = router;
