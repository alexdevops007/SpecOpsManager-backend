const express = require("express");
const router = express.Router();
const operationTrackingController = require("../controllers/operationTrackingController");

// Routes pour le suivi des opérations

// Obtenir le suivi en temps réel d'une opération
router.get("/operations/:id/track", operationTrackingController.trackOperation);

// Mettre à jour le suivi d'une opération
router.put(
  "/operations/:id/track",
  operationTrackingController.updateOperationTracking
);

// Marquer une opération comme terminée
router.put(
  "/operations/:id/complete",
  operationTrackingController.markOperationAsComplete
);

// Obtenir l'historique des opérations complétées
router.get(
  "/operations/history",
  operationTrackingController.getOperationHistory
);

// Supprimer une opération de l'historique
router.delete(
  "/operations/history/:id",
  operationTrackingController.deleteOperationFromHistory
);

// Obtenir toutes les opérations en cours
router.get(
  "/operations/ongoing",
  operationTrackingController.getAllOngoingOperations
);

// Obtenir toutes les opérations en pause
router.get("/operations/pause", operationTrackingController.pauseOperations);

// Mettre en pause une opération en cours
router.put("/operations/:id/pause", operationTrackingController.pauseOperation);

// Reprendre une opération en pause
router.put(
  "/operations/:id/resume",
  operationTrackingController.resumeOperation
);

module.exports = router;
