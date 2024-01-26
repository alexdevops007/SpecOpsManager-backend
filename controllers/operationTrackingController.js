const Operation = require("../models/Operation");

// Controller pour le suivi des opérations

// Obtenir le suivi en temps réel d'une opération
const trackOperation = async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id);

    if (operation) {
      res.json({
        operationId: operation._id,
        status: operation.status,
        teams: operation.teams,
        progress: operation.progress,
        startTime: operation.startTime,
      });
    } else {
      res.status(404).json({ message: "Opération non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour le suivi d'une opération
const updateOperationTracking = async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id);

    if (operation) {
      // Mettez à jour les données de suivi en fonction de la requête
      operation.status = req.body.status || operation.status;
      operation.progress = req.body.progress || operation.progress;

      // Sauvegardez les modifications
      const updatedOperation = await operation.save();
      res.json(updatedOperation);
    } else {
      res.status(404).json({ message: "Opération non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Marquer une opération comme terminée
const markOperationAsComplete = async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id);

    if (operation) {
      operation.status = 'Completed';
      operation.progress = 100;

      // Sauvegardez les modifications
      const updatedOperation = await operation.save();
      res.json(updatedOperation);
    } else {
      res.status(404).json({ message: "Opération non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir l'historique des opérations
const getOperationHistory = async (req, res) => {
  try {
    // Vous pouvez personnaliser cette méthode en fonction de vos besoins
    const history = await Operation.find({ status: 'Completed' });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une opération terminée de l'historique
const deleteOperationFromHistory = async (req, res) => {
  try {
    const operation = await Operation.findByIdAndDelete(req.params.id);

    if (operation) {
      res.json({ message: "Opération supprimée de l'historique" });
    } else {
      res.status(404).json({ message: "Opération non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Obtenir toutes les opérations en cours
const getAllOngoingOperations = async (req, res) => {
  try {
    const ongoingOperations = await Operation.find({ status: 'In Progress' });
    res.json(ongoingOperations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre en pause une opération en cours
const pauseOperation = async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id);

    if (operation && operation.status === 'In Progress') {
      operation.status = 'Paused';

      // Sauvegardez les modifications
      const updatedOperation = await operation.save();
      res.json(updatedOperation);
    } else {
      res.status(404).json({ message: "Opération en cours non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reprendre une opération en pause
const resumeOperation = async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id);

    if (operation && operation.status === 'Paused') {
      operation.status = 'In Progress';

      // Sauvegardez les modifications
      const updatedOperation = await operation.save();
      res.json(updatedOperation);
    } else {
      res.status(404).json({ message: "Opération en pause non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  trackOperation,
  updateOperationTracking,
  markOperationAsComplete,
  getOperationHistory,
  deleteOperationFromHistory,
  getAllOngoingOperations,
  pauseOperation,
  resumeOperation,
};
