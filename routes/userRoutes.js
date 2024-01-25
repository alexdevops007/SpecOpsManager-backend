const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CRUD operations
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Authentication
router.post("/users/authenticate", userController.authenticateUser);

// Team-related operations
router.post("/users/add-to-team", userController.addUserToTeam);
router.get("/users/:id/teams", userController.getUserTeams);

module.exports = router;
