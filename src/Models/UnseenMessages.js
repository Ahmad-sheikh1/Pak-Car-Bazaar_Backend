const mongoose = require("mongoose");

const unseenSchema = new mongoose.Schema({
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    messages: [
        {
            userId: String,
            toUserId: String,
            messages: [
                {
                    content: String,
                    timestamp: Number
                }
            ],
            status: String
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Unseen', unseenSchema);
