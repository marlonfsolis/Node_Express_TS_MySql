import {Express} from "express";

import {dbDebug} from './debuggers';
import db from "../shared/Database";
import {Connection} from "mysql2/promise";


const createDbConnection = (app: Express) => {
    dbDebug("Creating database connection pool...");

    app.locals.pool = db.getConnPool();
    // const pool = app.locals.pool;
    // pool.on('connection', function (connection:Connection) {
    //     dbDebug("Connection ID: " + connection.threadId.toString());
    // });
    // pool.on('acquire', function (connection:Connection) {
    //     dbDebug("Acquired Connection ID: " + connection.threadId.toString());
    // });
}

export default createDbConnection;
