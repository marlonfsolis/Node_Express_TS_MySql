import {IErr} from "./Err";

export interface IResult<T> {
    success: boolean;
    data?: T;
    err?: IErr;
    [key: string]: any;
}

export class Result<T> implements IResult<T> {
    [key: string]: any;
    success: boolean;
    data?: T;
    err?: IErr;

    constructor(success?: boolean, data?: T, err?: IErr) {
        // console.log(success);

        this.success = success === undefined ? true : success;
        this.data = data;
        this.err = err;
    }
}


export class ResultOk<T> extends Result<T> {
    constructor(data: T) {
        super(true, data, undefined);
    }
}

export class ResultError<T> extends Result<T> {
    constructor(err: IErr) {
        super(false, undefined, err);
    }
}
