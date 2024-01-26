const mongoose = require("mongoose");
const colors = require("colors");
const config = require("../config");

mongoose.connect(config.database.url);

mongoose.connection.on("connected", () => {
  console.log(`Connecté à la base de données`.bgGreen.bold);
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`.bgRed);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Disconnected from MongoDB`.red);
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      `MongoDB connection closed due to application termination`.magenta
    );
    process.exit(0);
  });
});

// mongoose
//   .connect(config.database.url)
//   .then(() => console.log(`Connecté à la base de données`.bgGreen))
//   .catch((error) => console.error("Error connecting to MongoDB: ", error));
