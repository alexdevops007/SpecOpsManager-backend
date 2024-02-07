const Operation = require("../models/Operation");

// Obtenir toutes les opérations planifiées
const getAllOperations = async (req, res) => {
  try {
    const operations = await Operation.find();
    res.json(operations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une opération planifiée par son ID
const getOperationById = async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id);
    if (operation) {
      res.json(operation);
    } else {
      res.status(404).json({ message: "Opération non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle opération planifiée
const createOperation = async (req, res) => {
  const operation = new Operation({
    name: req.body.name,
    objectives: req.body.objectives,
    teams: req.body.teams,
    resources: req.body.resources,
    status: req.body.status || "Planned",
    progress: req.body.progress,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  try {
    const newOperation = await operation.save();
    res.status(201).json(newOperation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une opération planifiée
const updateOperation = async (req, res) => {
  try {
    const updatedOperation = await Operation.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          objectives: req.body.objectives,
          teams: req.body.teams,
          resources: req.body.resources,
          status: req.body.status,
          progress: req.body.progress,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
        },
      },
      { new: true }
    );

    if (updatedOperation) {
      res.json(updatedOperation);
    } else {
      res.status(404).json({ message: "Opération non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une opération planifiée
const deleteOperation = async (req, res) => {
  try {
    const deletedOperation = await Operation.findByIdAndDelete(req.params.id);

    if (deletedOperation) {
      res.json({ message: "Opération supprimée" });
    } else {
      res.status(404).json({ message: "Opération non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOperations,
  getOperationById,
  createOperation,
  updateOperation,
  deleteOperation,
};
