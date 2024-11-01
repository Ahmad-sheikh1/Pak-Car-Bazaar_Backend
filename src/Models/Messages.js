const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    messages: [
        {
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ],
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'seen'],
        default: 'sent'
    }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
