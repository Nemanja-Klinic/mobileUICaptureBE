const express = require("express");
const router = express.Router();
const { getTesterExperience } = require("../controllers/tester");

// Create a new tester and kpis
router.get("/experience", getTesterExperience);

module.exports = router;
