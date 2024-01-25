const express = require("express");
const router = express.Router();
const operationPlanningController = require("../controllers/operationPlanningController");

// CRUD operations
router.get("/operations", operationPlanningController.getAllOperations);
router.get("/operations/:id", operationPlanningController.getOperationById);
router.post("/operations", operationPlanningController.createOperation);
router.put("/operations/:id", operationPlanningController.updateOperation);
router.delete("/operations/:id", operationPlanningController.deleteOperation);

module.exports = router;
