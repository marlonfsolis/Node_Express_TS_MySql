import express from "express";

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, _next) {
  res.status(200).send("Express Index page");
});

export default router;
