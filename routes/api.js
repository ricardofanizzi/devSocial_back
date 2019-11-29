var express = require('express');
var router = express.Router();

const apiUserRouter = require('./api/users');
const apiTemasRouter = require('./api/temas');




router.use('/users', apiUserRouter);
router.use('/temas', apiTemasRouter);

module.exports = router;