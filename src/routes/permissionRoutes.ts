import {Router} from "express";

import * as PermissionController from "../controllers/permissionController";


const router = Router();

/* GET permissions. */
router.get('/', PermissionController.getPermissions);

/* POST a permission */
router.post('/', PermissionController.createPermission);

// export const usersRoutes = router;
export default router;
