import mysql from "mysql2/promise";

import {Configuration as config} from '../utils/configuration';
import {dbDebug} from '../startup/debuggers';


export class Database {
    private readonly connConfig: mysql.ConnectionOptions;
    private readonly poolConfig: mysql.PoolOptions;

    constructor() {

        const basicConnConfig = {
            user: config.db.username,
            password: config.db.password,
            database: config.db.name,
            host: config.db.host
        };

        this.connConfig = { ...basicConnConfig };

        this.poolConfig = {
            ...basicConnConfig,
            connectionLimit: 1
        };
    }

    async getDbConnection() {
        try {
            const connection = await mysql.createConnection(this.connConfig);
            await connection.connect();
            return connection;
        } catch (err) {
            const errMsg = "Error creating connection.";
            dbDebug(errMsg, err);
            throw Error(errMsg);
        }
    }

    getConnPool() {
        return mysql.createPool(this.poolConfig);
    }
}

export default new Database();

