require("dotenv").config();
require("colors");
const mongoose = require("mongoose");
const CatchAsync = require("../Utils/CatchAsync");

const ConnectDB = CatchAsync(async () => {
    await mongoose.connect(`${process.env.DB_URL}`, {
        connectTimeoutMS: 60000
    });

    console.log("Connected to DB".green.bold);

});

module.exports = ConnectDB;