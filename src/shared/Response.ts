import {IErr} from "./Err";

export interface IResponse<T> {
    statusCode: number;
    msg: string;
    data: T;
    err: IErr
}
