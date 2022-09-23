import {Request, Response} from "express";

import PermissionService from "../services/permissionService";
import {
    HttpResponseBadRequest,
    HttpResponseCreated,
    HttpResponseInternalServerError,
    HttpResponseOk
} from "../shared/HttpResponse";
import {IPermission} from "../models/Permission";

/** Get permission list. */
export const getPermissions = async (req:Request, res:Response) => {
    const permServ = new PermissionService(req.app.locals.pool);

    const result = await permServ.getPermissions();
    if (!result.success) {
        return new HttpResponseInternalServerError(res, [result.err!]);
    }

    const permissions = result.data;
    return new HttpResponseOk(res, permissions);
};

/** Post a permission */
export const createPermission = async (req: Request, res: Response) => {
    const permServ = new PermissionService(req.app.locals.pool);

    const p = req.body as IPermission;
    const result = await permServ.createPermission(p);
    if (!result.success || !result.data) {
        const code = result.getErrorCode();
        if (code === `400`)
            return new HttpResponseBadRequest(res, [result.err!]);
        return new HttpResponseInternalServerError(res,[result.err!]);
    }

    return new HttpResponseCreated(res, result.data);
};

