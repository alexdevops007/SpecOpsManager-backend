// websocketConfig.js
const WebSocket = require("ws");

module.exports = function (server) {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on("connection", (ws) => {
    console.log("Nouvelle connexion WebSocket");

    // Écoutez les messages du client WebSocket
    ws.on("message", (message) => {
      console.log(`Reçu: ${message}`);
    });

    // Envoyez un message au client WebSocket
    ws.send("Bienvenue sur le serveur WebSocket");

    // Gérez la fermeture de la connexion WebSocket
    ws.on("close", () => {
      console.log("Connexion WebSocket fermée");
    });
  });

  return wss;
};
