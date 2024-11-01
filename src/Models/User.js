const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    },
    lastActive: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
