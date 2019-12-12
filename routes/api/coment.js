const express = require("express");
const router = express.Router();
const coment = require("../../models/coment");

//POST http://localhost:3000/api/coment

router.post("/", (req, res) => {
  coment
    .newComent(req.body)
    .then(async result => {
      let comentarios = await coment.getComents(req.body.idTema);
      res.json(comentarios);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/:pId", (req, res) => {
  console.log(req.params.pId);
  coment.getComents(req.params.pId).then(rows => {
    res.json(rows);
  });
});

module.exports = router;