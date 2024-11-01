const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const redis = require("../Configurations/Redis_Configuration");
const AppError = require("../Utils/AppError");
const User = require("../Models/User");
const CatchAsync = require("../Utils/CatchAsync");
const Message = require("../Models/Messages");
const Unseen = require("../Models/UnseenMessages");

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

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return next(new AppError("Invalid Token", 401));
            }

            socket.userId = decoded.Id;

            const user = await User.findById(socket.userId);
            if (user && user.isBlocked) {
                cosnole.log("User iS Blocked")
                return next(new AppError("User is blocked", 403));
            }
            console.log("User is not Blocked")
            next();
        });
    });

    io.on("connection", async (socket) => {
        console.log("User connected:", socket.userId);

        redis.sadd("activeUser", Date.now(), socket.userId);

        try {
            const unseen = await Unseen.findOne({ toUserId: socket.userId });

            if (unseen && unseen.messages.length > 0) {
                let toUserId = unseen.toUserId;

                const messagesToInsert = unseen.messages.map((message) => ({
                    userId: message.userId,
                    toUserId: toUserId,
                    messages: [
                        {
                            content: message.messages[0].content,
                            timestamp: Date.now()
                        }
                    ],
                    status: 'sent'
                }));

                await Message.insertMany(messagesToInsert);
                unseen.messages.forEach((message) => {
                    console.log(message);

                    io.to(toUserId).emit("newMessage", JSON.stringify(message));
                });

                console.log("Unseen messages delivered to user:", messagesToInsert.length);

                await Unseen.deleteOne({ toUserId: socket.userId });

                console.log("Unseen messages cleared for user:", messagesToInsert.length);
            }
        } catch (err) {
            console.error("Error fetching unseen messages:", err);
        }


        socket.on("sendMessage", CatchAsync(async (data) => {
            let { toUserId, message } = data;


            console.log("Message received on server:", data);

            const isRecipientOnline = await redis.sismember("activeUser", toUserId);

            console.log("Recipient online status:", isRecipientOnline);

            if (isRecipientOnline) {
                io.to(toUserId).emit("newMessage", message);

                console.log("Message broadcasted:", message);

                await redis.rpush("messageQueue", JSON.stringify({
                    userId: socket.userId,
                    toUserId: toUserId,
                    messages: [
                        {
                            content: message,
                            timestamp: Date.now()
                        }
                    ],
                    status: 'sent'
                }));

                console.log("Message saved and broadcasted:", { toUserId, message });

            } else {
                let unseen = await Unseen.findOne({ toUserId });
                if (!unseen) {
                    unseen = new Unseen({
                        toUserId,
                        messages: []
                    });
                }

                unseen.messages.push({
                    userId: socket.userId,
                    toUserId: toUserId,
                    messages: [
                        {
                            content: message,
                            timestamp: Date.now()
                        }
                    ],
                    status: 'sent'
                });

                await unseen.save();

                console.log("Recipient offline, saving to Unseen:", message);
            }




        }));

        socket.on("disconnect", () => {
            const disconnectionTime = Date.now();

            redis.hset("userLastActive", socket.userId, disconnectionTime);
            redis.srem("activeUser", socket.userId);
            console.log(`User disconnected: ${socket.userId}`);
        });
    });

    setInterval(CatchAsync(async () => {
        const userLastActiveData = await redis.hgetall("userLastActive");
        if (userLastActiveData) {
            const bulkUpdates = Object.entries(userLastActiveData).map(([userId, lastActive]) => {
                return User.findByIdAndUpdate(userId, { lastActive: new Date(parseInt(lastActive)) });
            });
            await Promise.all(bulkUpdates);
            await redis.del("userLastActive");
            console.log("User last active times updated in the database.");
        }
    }), 60000);

    setInterval(CatchAsync(async () => {
        const messageQueue = await redis.lrange("messageQueue", 0, -1);

        if (messageQueue.length > 0) {
            const messagesToInsert = messageQueue.map(message => JSON.parse(message));

            await Message.insertMany(messagesToInsert);

            await redis.del("messageQueue");

            console.log("Bulk inserted messages into database:", messagesToInsert.length);
        }
    }), 60000);


    return io;
}

module.exports = setupSocketServer;
