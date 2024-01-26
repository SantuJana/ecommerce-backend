const express = require("express");
const ejs = require('ejs');
const morgan = require("morgan");
const cors = require("cors");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
const session = require('express-session');
const connectToMongoDB = require("./config/db.config");
const routes = require("./routes");
const handleError = require("./middlewares/errorHandler");
const MongoDBStore = require('connect-mongodb-session')(session);
const { sessionSecret, sessionTime, baseUrl, dbUrl } = require('./config');

const app = express();
connectToMongoDB();
app.use(morgan("tiny"));
app.use(cors({origin: baseUrl}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, "./public")));
app.use(cookieParser());
const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'sessions'
  });
app.use(session({
    key: "jmv_backend",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { expires: sessionTime * 60 * 1000 },
    store: store,
}
));
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Ecommerce Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a ecommerce API application made with Express and documented with Swagger",
            license: {
                name: "Apache 2.0",
                url: "http://www.apache.org/licenses/LICENSE-2.0.html",
            },
            contact: {
                name: "Ecommerce",
                url: "https://ecommerce.com",
                email: "santu@email.com",
            },
        },
        servers: [
            {
                url: `${baseUrl}/api`,
            },
        ],
    },
    apis: ["src/routes/api/*.js"],
};

const spec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec,{ explorer: true }));
app.use(routes);
app.use(handleError);

module.exports = app;
