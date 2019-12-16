const express = require("express");
const router = express.Router();

const apiUserRouter = require('./api/users');
const apiTemasRouter = require('./api/temas');
const apiUserProfileRouter = require('./api/userProfile');
const apiUserTemaRouter = require('./api/userTema');
const apiComentsRouter = require('./api/coment');
const apiSubscriptionRouter = require('./api/subscription');

router.use("/users", apiUserRouter);
router.use("/temas", apiTemasRouter);
router.use("/userProfile", apiUserProfileRouter);
router.use("/coment", apiComentsRouter);
router.use("/usertema", apiUserTemaRouter);
router.use('/subscription', apiSubscriptionRouter);

module.exports = router;
