const { log, error } = require("console");
const mongoose = require("mongoose");
const { dbUrl } = require("./index");

const connectToMongoDB = async () => {
    log("Trying to connect with mongodb");
    mongoose
    .connect(dbUrl)
    .then(() => {
        log("Successfully connected to mongodb");
    })
    .catch((err) => {
        error("Failed to connect with mongodb\nError : ", err.message);
    });
};

module.exports = connectToMongoDB;
