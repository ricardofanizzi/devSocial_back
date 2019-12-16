const express = require("express");
const UserTema = require("../../models/user_temas");

const router = express.Router();

router.post("/insert", async (req, res) => {
  const result = await UserTema.insert(req.body);
  res.json(result);
});

//GET http://localhost:3000/usertema/allData/:2
router.get("/allData/:userId", async (req, res) => {
  const rows = await UserTema.getTemaByUser(req.params.userId);
  console.log(rows.json);
});

module.exports = router;
