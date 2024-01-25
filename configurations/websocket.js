const socketIO = require("socket.io");

module.exports = (server) => {
  // Crée une instance de Socket.io associée au serveur HTTP
  const io = socketIO(server);

  // Gestionnaire d'événements pour les nouvelles connexions
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Ecoute les messages de chat
    socket.on("chat message", (msg) => {
      // Émet le message à tous les clients connectés
      io.emit("chat message", msg);
    });

    // Gestionnaire d'événements pour les déconnexions
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Retourne l'instance de Socket.io pour une utilisation éventuelle
  return io;
};
