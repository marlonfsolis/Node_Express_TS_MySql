import {ResultSetHeader} from "mysql2/promise";
import {dbDebug} from "../startup/debuggers";

/** Statistic object returned as output from procedures */
export interface IOutputResult {
    success: boolean,
    msg: string,
    errorLogId: number,
    recordCount: number
}

/** Model the result of a procedure call */
export interface ISqlResult {
    data:any[];
    fields: any[];
    outParams:object;
    resultSetHeader:object;
    getOutputVal<T>(name:string):T;
    getData<T>(idx:number):T[];
}

/** Model the result of a procedure call */
export class SqlResult implements ISqlResult {
    public data: any[];
    public fields: any[];
    public outParams: any;
    public resultSetHeader: ResultSetHeader;

    constructor(fields:any[], outParams:object) {
        this.data = [];
        this.fields = fields;
        this.outParams = outParams;
        this.resultSetHeader = {} as ResultSetHeader;
    }

    getOutputVal<T>(name: string): T {
        // dbDebug(this.outParams);
        return JSON.parse(this.outParams[name]) as T;
    }

    getData<T>(idx:number): T[] {
        return this.data[idx] as T[];
    }

}
