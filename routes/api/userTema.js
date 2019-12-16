const express = require("express");
const userTema = require("../../models/user_temas");
const middleware = require("../middleware");

const router = express.Router();

router.use(middleware.checkToken);

router.post("/insert", async (req, res) => {
  req.body.idUser = req.userId;
  const result = await userTema.insert(req.body);
  res.json(result);
});

router.post("/checkuser", async (req, res) => {
  req.body.idUser = req.userId;
  const result = await userTema.checkUser(req.body);
  res.json(result[0]);
});

//GET http://localhost:3000/usertema/allData/:2
router.get("/allData/:userId", async (req, res) => {
  const rows = await UserTema.getTemaByUser(req.params.userId);
  console.log(rows.json);
});

module.exports = router;
