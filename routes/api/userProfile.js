const express = require("express");
const router = express.Router();
const UserProfile = require("../../models/userProfile");

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

router.get("/allData/:userId", async (req, res) => {
  const rows = await UserProfile.getDataUserTables(req.params.userId);
  res.json(rows);
});

module.exports = router;
