import {check} from "express-validator";

export interface IPermission {
    name: string;
    description: string
}

/**
 * Validate permission input param
 * */
export const permissionValidator = () => [
    check(`name`).exists().isLength({min:3, max:100}),
    check(`description`).optional().isLength({min:0, max:1000})
];

