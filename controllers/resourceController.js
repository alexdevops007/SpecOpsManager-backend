const Resource = require("../models/Resource");

// Obtenir toutes les ressources
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une ressource par son ID
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: "Ressource non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle ressource
const createResource = async (req, res) => {
  const resource = new Resource({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    status: req.body.status || "Available",
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une ressource
const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
      resource.name = req.body.name || resource.name;
      resource.description = req.body.description || resource.description;
      resource.quantity = req.body.quantity || resource.quantity;
      resource.status = req.body.status || resource.status;

      const updatedResource = await resource.save();
      res.json(updatedResource);
    } else {
      res.status(404).json({ message: "Ressource non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une ressource
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
      await resource.remove();
      res.json({ message: "Ressource supprimée" });
    } else {
      res.status(404).json({ message: "Ressource non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
