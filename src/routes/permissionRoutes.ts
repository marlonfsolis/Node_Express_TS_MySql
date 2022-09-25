import {Router} from "express";

import * as PermissionController from "../controllers/permissionController";
import {permissionValidator} from "../models/Permission";


const router = Router();

/* GET permissions. */
router.get('/', PermissionController.getPermissions);

/* POST a permission */
router.post('/', permissionValidator(), PermissionController.createPermission);

/* PUT a permission */
router.put('/:name', permissionValidator(), PermissionController.updatePermission);

/* DELETE a permission */
router.delete('/:name', PermissionController.deletePermission);

/* GET a permission */
router.get('/:name', PermissionController.getPermission);

// export const usersRoutes = router;
export default router;
