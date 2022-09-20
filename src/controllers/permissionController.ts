import {Request, Response} from "express";

import PermissionService from "../services/permissionService";
import {HttpResponseInternalServerError, HttpResponseOk} from "../shared/HttpResponse";


export const getPermissions = async (req:Request, res:Response) => {
    const permServ = new PermissionService(req.app.locals.pool);

    const result = await permServ.getPermissions();
    if (!result.success) {
        return new HttpResponseInternalServerError(res, [result.err!]);
    }

    const permissions = result.data;
    return new HttpResponseOk(res, permissions);
};

export const createPermission = (req: Request, res: Response) => {
    res.status(200).send({
       error: "",
       data: {
           message: "Permission created!"
       }
    });
};

