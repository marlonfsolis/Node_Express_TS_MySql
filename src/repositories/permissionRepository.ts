import {Pool} from "mysql2/promise";

import {dbDebug} from "../startup/debuggers";
import {IPermission} from "../models/Permission";
import {IResult, ResultOk, ResultError, Result} from "../shared/Result";
import {Err} from "../shared/Err";
import {IOutputResult, getOutputResult, getData} from "../shared/SqlResult";


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

        const sql = "CALL sp_permissions_readlist(?,?,?,?,@result);";
        const [rows, fields] = await this.pool.execute(sql, [0,0,null,null]);
        const [resultRows] = await this.pool.execute("SELECT @result;");
        const result = getOutputResult(resultRows);

        if (!result.success) {
            return new ResultError<IPermission[]>(
                new Err(result.msg, "sp_permissions_readlist", result.errorLogId.toString())
            );
        }
        permissions = getData<IPermission[]>(rows);

        return new ResultOk<IPermission[]>(permissions);
    }
}
