import {Router} from "express";

const router = Router();

/* GET users listing. */
router.get('/', function(req, res, _next) {
  res.send('Respond with a resource from users route!!!');
});

// export const usersRoutes = router;
export default router;
