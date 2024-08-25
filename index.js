const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { connection } = require("./src/config/db");
const app = express();
const port = process.env.PORT || 8000
const expressJSDocSwagger = require("express-jsdoc-swagger");
const cookieParser = require("cookie-parser");

const option = {
    info: {
        title: 'Movie Node JS Project',
        version: '1.0.0'
    },
    security: {
        BearerAuth: {
            type: "http",
            scheme: "bearer",
        },
    },
    baseDir: __dirname,
    swaggerUIPath: "/api-docs",
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: "/v3/api-docs",
    notRequiredAsNullable: false,
    apis: [
        "./src/controller/*.js",
        "./src/routes/*.js",]
}

expressJSDocSwagger(app)(option);

app.use(express.json());
app.use(cookieParser());
connection()

app.use("/api/v1/user", require("./src/routes/user"));
app.use("/api/v1/movie", require("./src/routes/movie"));

app.listen(port, () => console.log(`Server up and running on port ${port}`));