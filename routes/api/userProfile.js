const express = require('express');
const router = express.Router();
const UserProfile = require('../../models/userProfile');


//POST  https://localhost:3000/api/userProfile
router.post('/', (req, res) => {
    UserProfile.createUser(req.body).then(resolve => {
        res.json(resolve)
    }).catch(error => {
        console.log(error)
    })
});








module.exports = router;