import {Router} from "express";

import * as PermissionController from "../controllers/permissionController";


const router = Router();

/* GET permissions. */
router.get('/', PermissionController.getPermissions);

/* POST a permission */
router.post('/', PermissionController.createPermission);

/* DELETE a permission */
router.delete('/:name', PermissionController.deletePermission);

/* GET a permission */
router.get('/:name', PermissionController.getPermission);

// export const usersRoutes = router;
export default router;
