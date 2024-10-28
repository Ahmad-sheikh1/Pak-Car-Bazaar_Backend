const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const redis = require("../Configurations/Redis_Configuration");
const AppError = require("../Utils/AppError");

function setupSocketServer(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token; 
        console.log("Token received:", token);

        if (!token) {
            return next(new AppError("No token provided", 401));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new AppError("Invalid Token", 401));
            }

            socket.userId = decoded.Id; 
            next(); 
        });
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.userId); 

        redis.sadd("activeUser", Date.now(), socket.userId);

        socket.on("disconnect", () => {
            redis.srem("activeUser", socket.userId);
            console.log(`User disconnected: ${socket.userId}`);
        });
    });

    return io; 
}

module.exports = setupSocketServer;
