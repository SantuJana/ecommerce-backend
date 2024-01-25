const dotenv = require("dotenv");
dotenv.config();

const nodeEnv = process.env.NODE_ENV;
let port = 8080;
let dbUrl = "";
let secret = "";
let baseUrl = "";
let sessionSecret = "";
let sessionTime = 0;

if (nodeEnv === "DEV") {
    port = process.env.DEV_PORT;
    dbUrl = process.env.DEV_DB_URL;
    secret = process.env.DEV_SECRET;
    sessionSecret = process.env.DEV_SESSION_SECRET;
    sessionTime = process.env.DEV_SESSION_TIME;
    baseUrl = `${process.env.DEV_BASE_URL}:${port}`;
} else {
    port = process.env.PROD_PORT;
    dbUrl = process.env.PROD_DB_URL;
    secret = process.env.PROD_SECRET;
    sessionSecret = process.env.PROD_SESSION_SECRET;
    sessionTime = process.env.PROD_SESSION_TIME;
    baseUrl = process.env.PROD_BASE_URL;
}

module.exports = {
    port,
    dbUrl,
    secret,
    sessionSecret,
    baseUrl,
    sessionTime,
};
