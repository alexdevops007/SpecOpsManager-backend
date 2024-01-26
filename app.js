const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();

const server = require('./server');
const mongodb = require("./database/mongodb");

const config = require("./config");
