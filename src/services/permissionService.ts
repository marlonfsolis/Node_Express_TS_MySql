import {Pool} from "mysql2/promise";

import {IResult, ResultError} from "../shared/Result";
import {IPermission} from "../models/Permission";
import PermissionRepository from "../repositories/permissionRepository";
import {Err, IErr} from "../shared/Err";

export default class PermissionService
{
    private readonly pool: Pool;
    private readonly permRepo:PermissionRepository;

    constructor(pool:Pool) {
        this.pool = pool;
        this.permRepo = new PermissionRepository(pool);
    }

    /**
     * Save a permission object
     */
    async getPermissions(): Promise<IResult<IPermission[]>> {
        try {
            return await this.permRepo.getPermissions();
        } catch (err) {
            console.log(err);
            return new ResultError(
                new Err(
                    `Error - Something bad happen. ${JSON.stringify(err)}`,
                    `permissionService.getPermissions`
                )
            );
        }
    }
}
