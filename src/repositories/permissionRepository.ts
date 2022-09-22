import {Pool} from "mysql2/promise";

import {dbDebug} from "../startup/debuggers";
import {IPermission} from "../models/Permission";
import {IResult, ResultOk, ResultError, Result} from "../shared/Result";
import {Err} from "../shared/Err";
import {IOutputResult} from "../shared/SqlResult";
import db from "../shared/Database";



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

        const inValues = [0,0,null,null];
        const r = await db.call("sp_permissions_readlist",inValues,["@result"], this.pool);
        const callResult = r.getOutputVal<IOutputResult>("@result");

        if (!callResult.success) {
            return new ResultError<IPermission[]>(
                new Err(callResult.msg, "sp_permissions_readlist", callResult.errorLogId.toString())
            );
        }

        permissions = r.getData<IPermission>(0);
        return new ResultOk<IPermission[]>(permissions);
    }
}
