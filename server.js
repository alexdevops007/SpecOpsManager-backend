const colors = require("colors");
const dotenv = require("dotenv");
const http = require("http");
const {
  attachWebSocketServer,
} = require("./controllers/realTimeCoordinationController");
dotenv.config();

const expressConfig = require("./configurations/express");
const websocketConfig = require("./configurations/websocket");

// Configurer le serveur Express
const app = expressConfig();
const server = http.createServer(app);

// Configurer et attacher le serveur WebSocket au serveur HTTP Express
const wssWebSocketConfig = websocketConfig(server);
attachWebSocketServer(server);

const config = require("./config");

// Démarrer le serveur HTTP Express
server.listen(config.port, () => {
  console.log(
    `Serveur Express en cours d'exécution sur le port ${config.port}🕺😊☄️☀️`
      .bgCyan.bold
  );
});

// Fonction fictive pour envoyer une notification
const sendNotification = (subject, message) => {
  // Ajoutez ici le code pour envoyer une notification (par exemple, via un service de notification)
  console.log(`Notification envoyée : ${subject} - ${message}`.bgGreen);
};

// Fonction fictive pour enregistrer l'erreur dans un fichier de journal
const logErrorToFile = (subject, error) => {
  // Ajoutez ici le code pour enregistrer l'erreur dans un fichier de journal
  console.log(
    `Erreur enregistrée dans un fichier de journal - ${subject}:`.bgRed,
    error
  );
};

// Fonction pour gérer les erreurs du serveur WebSocket
const handleWebSocketError = (error) => {
  console.error("Erreur du serveur WebSocket:", error);

  // Utilisez les fonctions existantes pour envoyer une notification et enregistrer dans un fichier de journal
  sendNotification("Erreur du serveur WebSocket", error);
  logErrorToFile("Erreur du serveur WebSocket", error);
};

// Attachez la fonction à l'événement 'error' du serveur WebSocket
wssWebSocketConfig.on("error", handleWebSocketError);

// Fermeture du serveur
process.on("SIGINT", () => {
  console.log(`Arrêt du serveur Express`.red.bold);
  // Code pour nettoyer les ressources, fermer les connexions, etc.
  server.close(() => {
    console.log(`Serveur Express fermé`.bgRed.bold);
    process.exit();
  });
});

module.exports = server;
