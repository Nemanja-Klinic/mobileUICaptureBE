const express = require("express");
const router = express.Router();
const { createCell, getAllCells, getCellById, updateCell, deleteCell } =
  require("../controllers").cellController;

router.post("/", createCell);

router.get("/", getAllCells);

router.get("/:id", getCellById);

router.put("/:id", updateCell);

router.delete("/:id", deleteCell);

module.exports = router;
