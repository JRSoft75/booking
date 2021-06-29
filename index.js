'use strict';
require("dotenv").config();
const config = require('./config');
const express = require('express')
const path = require('path')
const exegesisExpress = require('exegesis-express');
const cors = require('cors');
const http = require('http');
const authenticator = require('./rest/authenticator');


async function createServer() {
    const middleware = await exegesisExpress.middleware(
        path.resolve(__dirname, './openapi.yaml'),
        {
            controllers: path.resolve(__dirname, 'rest/controller'),
            allowMissingControllers: false,
            ignoreServers: true,
            authenticators: {
                bearerAuth: authenticator.jwtAuthenticator
            },
            mimeTypeParsers: {
                parseReq(req, res, next) {
                }
            }
        }
    );

    const app = express();
    app.use(cors());



    // If you have any body parsers, this should go before them.
    app.use(middleware);

    // Return a 404
    app.use((req, res) => {
        res.status(404).json({ message: 'PAGE_NOT_FOUND' });
    });

    app.use(logErrors);

    // Handle any unexpected errors
    app.use((err, req, res, next) => {
        res.status(500).json({ message: `Internal error: ${err.message}` });
    });

    return http.createServer(app);
}

createServer()
    .then(server => {
        server.listen(3000);
        console.log('Listening on port 3000');
        console.log('Try visiting http://localhost:3000/');
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });



function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}