const User = require("../models/User");
const bcrypt = require("bcrypt");

// Obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un utilisateur par son ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || "Operator",
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "Utilisateur supprimé" });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Authentification de l'utilisateur
const authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    } else {
      res.json({ message: "Authentification réussie", user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un utilisateur à une équipe
const addUserToTeam = async (req, res) => {
  const { userId, teamId } = req.body;

  try {
    const user = await User.findById(userId);

    if (user) {
      user.teams.push(teamId);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir toutes les équipes d'un utilisateur
const getUserTeams = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('teams');
    
    if (user) {
      res.json(user.teams);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser,
  addUserToTeam,
  getUserTeams,
};
