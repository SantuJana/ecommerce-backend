const dotenv = require("dotenv");
dotenv.config();

const nodeEnv = process.env.NODE_ENV;
let port = 8080;
let dbUrl = "";
let secret = "";

if (nodeEnv === "DEV") {
    port = process.env.DEV_PORT;
    dbUrl = process.env.DEV_DB_URL;
    secret = process.env.DEV_SECRET;
} else {
    port = process.env.PROD_PORT;
    dbUrl = process.env.PROD_DB_URL;
    secret = process.env.PROD_SECRET;
}

module.exports = {
    port,
    dbUrl,
    secret,
};
