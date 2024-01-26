const { WebSocket } = require("ws");

// WebSocket Server
const wss = new WebSocket.Server({ noServer: true });

// Controller pour la coordination en temps réel

// Gestion des connexions WebSocket
const configureWebSocketServer = (wss) => {
  if (!wss) {
    console.error("Erreur: wss n'est pas défini.");
    return;
  }

  // Ajoutez ici la logique de configuration du serveur WebSocket
  wss.on("connection", (ws) => {
    // Logique de gestion des connexions
    console.log("Nouvelle connexion WebSocket établie.");

    // Écoute des messages du client
    ws.on("message", (message) => {
      // Logique de gestion des messages
      console.log(`Message reçu : ${message}`);

      // Diffusion du message à tous les clients connectés
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    // Gestion de la fermeture de la connexion
    ws.on("close", () => {
      // Logique de gestion de la fermeture
      console.log("Connexion WebSocket fermée.");
    });
  });
};

// Fonction pour attacher le serveur HTTP Express à WebSocket Server
const attachWebSocketServer = (server) => {
  try {
    const wss = require("../configurations/websocket")(server); 
    if (!wss) {
      console.error("Erreur: wss n'est pas défini.");
      return;
    }

    configureWebSocketServer(wss); 
    server.on("upgrade", (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    });
  } catch (error) {
    console.error("Erreur lors de l'attache du serveur WebSocket:", error);
  }
};

module.exports = {
  attachWebSocketServer,
};