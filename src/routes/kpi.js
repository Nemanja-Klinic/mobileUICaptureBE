// routes/kpi.js
const express = require("express");
const router = express.Router();
const kpiController = require("../controllers/kpi");

router.get("/:cellId", kpiController.getKPIsByCell);
router.post("/", kpiController.createKPI);

module.exports = router;
