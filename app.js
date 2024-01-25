const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongodb = require("./database/mongodb");

const app = express();
const config = require("./config");

dotenv.config();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'api SpecOpsManager");
});
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Bienvenue sur l'api SpecOpsManager",
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erreur serveur");
});

// Routes app

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}🕺😊☄️☀️`.bgBlue)
);
