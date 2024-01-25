const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");

// CRUD operations
router.get("/resources", resourceController.getAllResources);
router.get("/resources/:id", resourceController.getResourceById);
router.post("/resources", resourceController.createResource);
router.put("/resources/:id", resourceController.updateResource);
router.delete("/resources/:id", resourceController.deleteResource);

module.exports = router;
