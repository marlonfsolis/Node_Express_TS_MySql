import db from "../shared/Database";
import {IPermission} from "../models/Permission";
import {IResult, ResultOk, ResultError, Result} from "../shared/Result";
import {Err} from "../shared/Err";
import {dbDebug} from "../startup/debuggers";
import {Connection, PoolConnection, Pool} from "mysql2/promise";


export default class PermissionRepository
{
    private readonly pool:Pool;

    constructor(pool:Pool) {
        this.pool = pool;
    }

    /**
     * Get a permission list
     */
    async getPermissions(): Promise<IResult<IPermission[]>> {
        let permissions = [] as IPermission[];
        const [rows, fields] = await this.pool.execute("select * from permissions;");
        permissions = rows as IPermission[];

        return new ResultOk<IPermission[]>(permissions);
    }
}
