const express = require("express");
const router = express.Router();
const coment = require("../../models/coment");

//POST http://localhost:3000/api/coment

router.post("/", (req, res) => {
  coment
    .newComent(req.body)
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/", (req, res) => {
  coment.getComents().then(rows => {
    res.json(rows);
  });
});

module.exports = router;
