const express = require("express");
const router = express.Router();
const UserProfile = require("../../models/userProfile");
const middleware = require("../middleware");


//POST  http://localhost:3000/api/userProfile
router.post("/", (req, res) => {
  UserProfile.createUser(req.body)
    .then(resolve => {
      res.json(resolve);
    })
    .catch(error => {
      console.log(error);
    });
});


//GET http://localhost:3000/api/userProfile/allData/PARAMETROID
router.get("/allData/:userId", async (req, res) => {
  const rows = await UserProfile.getDataUserTables(req.params.userId);
  res.json(rows);
});


//POST http://localhost:3000/api/userProfile/dataExtra
router.use(middleware.checkToken);


router.post("/dataExtra", (req, res) => {
  req.body.id = req.userId;
  console.log(req.body)
  UserProfile.insertExtraInfo(req.body).then(resolve => {
    console.log(resolve)
    res.json(resolve)
  }).catch(error => {
    console.log(error);
  })
})


//POST http://localhost:3000/api/userProfile/about
router.post("/about", (req, res) => {
  req.body.id = req.userId;
  UserProfile.insertAbout(req.body).then(resolve => {
    res.json(resolve)
  }).catch(error => {
    console.log(error);
  })
})


//POST http://localhost:3000/api/userProfile/skills
router.post("/skills", (req, res) => {
  req.body.id = req.userId;
  UserProfile.updateSkills(req.body).then(resolve => {
    res.json(resolve)
  }).catch(error => {
    console.log(error);
  })
})


module.exports = router;
