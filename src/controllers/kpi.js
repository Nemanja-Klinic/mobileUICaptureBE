// controllers/kpiController.js
const KPI = require("../models/kpi");

// Get all KPIs for a specific cell
const getKPIsByCell = async (req, res) => {
  try {
    const { cellId } = req.params;
    const kpis = await KPI.find({ cellId }).sort({ createdAt: 1 }); // Sort by createdAt ascending
    res.json(kpis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createKPI = async (req, res) => {
  try {
    const kpiData = req.body; // Assuming your request body contains the KPI data
    const kpi = new KPI(kpiData);
    await kpi.save();
    res.status(201).json(kpi);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateKPIsForTester = async (req, res) => {
  const { cell_name, project_name, task_name, task_number, testerId } =
    req.body;
  const updateFields = req.body;

  try {
    const filter = {
      tester_id: testerId,
      cell_name,
      project_name,
      task_name,
      task_number,
    };
    const updatedKPIs = await KPI.updateMany(filter, updateFields, {
      new: true,
    });

    res.status(200).json(updatedKPIs);
  } catch (error) {
    console.error("Failed to update KPIs:", error);
    res.status(500).json({ error: "Failed to update KPIs" });
  }
};

module.exports = {
  getKPIsByCell,
  createKPI,
};
