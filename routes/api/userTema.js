const express = require("express");
const userTema = require("../../models/user_temas");
const middleware = require("../middleware");

const router = express.Router();

router.use(middleware.checkToken);

router.post("/insert", async (req, res) => {
  const result = await userTema.insert(req.body);
  res.json(result);
});

router.post("/checkuser", async (req, res) => {
  req.body.idUser = req.userId;
  const result = await userTema.checkUser(req.body);
  res.json(result[0]);
});



//GET http://localhost:3000/api/usertema/allData
router.get("/allData", async (req, res) => {
  req.body.userId = req.userId;
  const rows = await userTema.getTemaByUser(req.body);
  res.json(rows)
});


router.get("/dataInner", async (req, res) => {
  req.body.userId = req.userId;
  const rows = await userTema.getUserInTema(req.body);
  res.json(rows.map(item => item.id));
});
router.post("/checkusersbytema", async (req, res) => {
  const rows = await userTema.getUsersByTema(req.body);
  res.json(rows)
});

router.post("/delete", async (req, res) => {
  const result = userTema.deleteById(req.body);
  const rows = await userTema.getUsersByTema(req.body);
  res.json(rows);
});


module.exports = router
