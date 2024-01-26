const Team = require("../models/Team");

// Obtenir toutes les équipes
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une équipe par son ID
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: "Équipe non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle équipe
const createTeam = async (req, res) => {
  const team = new Team({
    name: req.body.name,
    description: req.body.description,
    members: req.body.members,
    leader: req.body.leader,
  });

  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une équipe
const updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          members: req.body.members,
          leader: req.body.leader,
        },
      },
      { new: true }
    );

    if (updatedTeam) {
      res.json(updatedTeam);
    } else {
      res.status(404).json({ message: "Équipe non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une équipe
const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);

    if (deletedTeam) {
      res.json({ message: "Équipe supprimée" });
    } else {
      res.status(404).json({ message: "Équipe non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
