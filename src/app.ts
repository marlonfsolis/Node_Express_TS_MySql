import express, {Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from "path";

// set the config folder path
process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname, "config");


import {dbDebug, debug} from "./startup/debuggers";
import routesLoader from "./startup/routes";
import createDbConnection from "./startup/database";

import {validateConfig} from "./utils/configuration";

const app = express();

// validate the configuration values
if (!validateConfig()) {
    console.log("FATAL ERROR: Some of the configuration value has not been set. Please make sure you set the " +
        "environment variables properly.");
    process.exit(1);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Load routes
routesLoader(app);

// Create database connection pool
createDbConnection(app);


export default app;
