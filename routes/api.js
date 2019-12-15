var express = require("express");
var router = express.Router();

const apiUserRouter = require("./api/users");
const apiTemasRouter = require("./api/temas");
const apiUserProfileRouter = require("./api/userProfile");
const apiUserTemaRouter = require("./api/userTema");
const apiComentsRouter = require("./api/coment");

router.use("/users", apiUserRouter);
router.use("/temas", apiTemasRouter);
router.use("/userProfile", apiUserProfileRouter);
router.use("/coment", apiComentsRouter);
router.use("/usertema", apiUserTemaRouter);

module.exports = router;
