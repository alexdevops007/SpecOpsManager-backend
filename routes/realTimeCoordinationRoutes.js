const express = require("express");
const router = express.Router();
const realTimeCoordinationController = require("../controllers/realTimeCoordinationController");

// Endpoint pour attacher le serveur WebSocket au serveur HTTP Express
router.get("/attachWebSocketServer", (req, res) => {
  realTimeCoordinationController.attachWebSocketServer(req.server);
  res.status(200).json({ message: "Serveur WebSocket attaché avec succès." });
});

module.exports = router;
