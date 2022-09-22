import mysql, {Pool, Connection, ResultSetHeader} from "mysql2/promise";

import {Configuration as config} from '../utils/configuration';
import {dbDebug} from '../startup/debuggers';
import {ISqlResult, SqlResult} from "./SqlResult";

/**
 * Class helper to do some database task
 * */
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

    /** Create a new connection */
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

    /** Create a new connection pool */
    getConnPool() {
        return mysql.createPool(this.poolConfig);
    }

    /** Get the object containing the output parameters from a procedure call. */
    getOutputs(rowData:any) {
        return rowData[0];
    }

    /** Get the output parameter value from a procedure call. */
    getOutput<T>(rowData:any, name:string) {
        return rowData[0][name] as T;
    }

    /** Get the data array from a query result. */
    getData<Type>(rows:any, idx:number=0) {
        return rows[idx] as Type;
    }

    /**
     * Call a stored procedure and return an object of type SqlResult.
     * @param proc {string} - Procedure name.
     * @param inValues {Array<any>} - Array of input values. Need to be in order.
     * @param outParams {Array<string>} - Array of output parameter names.
     * @param conn {Pool|Connection} - Connection to be used. If not passed a new connection will be created.
     * @return SqlResult
     * */
    async call(proc:string, inValues: any[], outParams:string[], conn?:Pool|Connection) {
        if (!conn) conn = await this.getDbConnection();

        let sql = "CALL ".concat(proc,"(");
        if (inValues.length > 0) {
            inValues.forEach((value:any,index:number)=>{
                sql = sql.concat("?");
                if (index < inValues.length-1) sql = sql.concat(", ");
            });
        }
        if (outParams.length > 0) {
            if (inValues.length > 0) sql = sql.concat(", ");
            outParams.forEach((value:string,index:number)=>{
                sql = sql.concat(value);
                if (index < outParams.length-1) sql = sql.concat(",");
            });
        }
        sql = sql.concat(");");

        const [rows,fields] = await conn.execute(sql, inValues);

        // Go and get the output parameters
        let outResults: any|null = null;
        if (outParams.length > 0) {
            let outSql = "SELECT ";
            outParams.forEach((value:string,index:number)=>{
                outSql = outSql.concat(value);
                if (index < outParams.length-1) outSql = outSql.concat(",");
            });
            outSql = outSql.concat(";");
            const [outRows] = await conn.execute(outSql);
            outResults = this.getOutputs(outRows);
        }

        const callRes:ISqlResult = new SqlResult(fields, outResults);
        const resultKeys = Object.keys(rows);
        if (resultKeys.includes("fieldCount")
            && resultKeys.includes("affectedRows")
            && resultKeys.includes("insertId")){
            callRes.resultSetHeader = rows as ResultSetHeader;
        } else {
            const data:any[] = [];
            const len = resultKeys.length - 1;
            for (let i=0; i<len; i++){
                data.push((rows as any[])[i]);
            }
            callRes.data = data;
            callRes.resultSetHeader = (rows as any[])[len] as ResultSetHeader;
        }
        return callRes;
    }
}

export default new Database();

