const express = require("express");
const ejs = require('ejs');
const morgan = require("morgan");
const cors = require("cors");
const compression = require('compression');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
const session = require('express-session');
const connectToMongoDB = require("./config/db.config");
const routes = require("./routes");
const handleError = require("./middlewares/errorHandler");
const { sessionSecret, baseUrl } = require('./config');
console.log(baseUrl);

const app = express();
connectToMongoDB();
app.use(morgan("tiny"));
app.use(cors({origin: baseUrl}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, "./public")));
app.use(session({
    name: "leptyn_backend",
    secret: "561vgvdy2767yhbew98w8dhwhvedw7",
    cookie: { maxAge: 6000000 },
    resave: true,
    saveUninitialized: true,
  }
));
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
                url: `${baseUrl}/ecommerce/api/v1`,
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
