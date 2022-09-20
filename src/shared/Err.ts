/**
 * Error response interface
 */
export interface IErr {
    msg: string;
    param: string;
    value: any;
    location: string;
    errorLogId: string;
    [key:string]: any;
}

/**
 * Error response class. Is used to create error information to be send to the client.
 * @property {string} msg - Message error
 * @property {string} param - Parameter or path that is not valid or error out.
 * @property {string|number} value - Current value of the parameter or path.
 * @property {string} location - Location where the parameter or path is located (body, query string, etc.).
 * @property {string} errorLogId - ID of the ErrorLog record on DB.
 */
export class Err implements IErr {
    msg: string;
    param: string;
    value: any;
    location: string;
    errorLogId: string;
    [key:string]: any;

    constructor(msg:string, location:string);
    constructor(msg:string, location:string, errorLogId: string);
    constructor(msg?: string, location?: string, errorLogId?: string, param?: string, value?: any) {
        this.msg = msg === undefined ? "" : msg;
        this.param = param === undefined ? "" : param;
        this.value = value;
        this.location = location === undefined ? "" : location;
        this.errorLogId = errorLogId === undefined ? "0" : errorLogId;
    }

}
