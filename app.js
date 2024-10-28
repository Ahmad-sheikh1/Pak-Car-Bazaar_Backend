require("dotenv").config();
require("colors");
const express = require("express");
const ConfigureMiddlewares = require("./src/Configurations/Middlewares_Config");
const Routes = require("./src/Configurations/routes");
const ConnectDB = require("./src/Configurations/DB_Configure");
const PORT = process.env.PORT || 3000;
const redis = require("./src/Configurations/Redis_Configuration");
const http = require("http");
const {Server} = require("socket.io");
const setupSocketServer = require("./src/Middlewares/Socket_Middleware");

const app = express();

// Create HTTP - Server
const server = http.createServer(app)


// Setup Socket.io
const io = setupSocketServer(server);


// Use The Middlewares
ConfigureMiddlewares(app);

// Use The Routes
Routes(app);


// Connect to the DB and Listen The Server
(async () => {
    try {
        await ConnectDB();
        server.listen(PORT, () => {
            console.log(`Server is Listening on ${PORT}`.white.bold);
        });
    } catch (error) {
        console.error("Error starting the server:", error.message);
    }
})();

