const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

module.exports = function() {
  const app = express();

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

  // Default Routes
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

  // Routes
  const operationTrackingRoutes = require("../routes/operationTrackingRoutes");
  const realTimeCoordinationRoutes = require("../routes/realTimeCoordinationRoutes");
  const resourceRoutes = require("../routes/resourceRoutes");
  const teamRoutes = require("../routes/teamRoutes");
  const userRoutes = require("../routes/userRoutes");
  const operationPlanningRoutes = require("../routes/operationPlanningRoutes");

  app.use("/api", operationTrackingRoutes);
  app.use("/api", realTimeCoordinationRoutes);
  app.use("/api", resourceRoutes);
  app.use("/api", teamRoutes);
  app.use("/api", userRoutes);
  app.use("/api", operationPlanningRoutes);

  return app;
}
