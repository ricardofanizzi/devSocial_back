var express = require('express');
var router = express.Router();

const Users = require('../../models/users')
router.get('/', (req, res)=>{
    Users.getAll()
    .then(rows=>{
        res.json(rows)
    })
    .catch(err => console.log(err))
})

module.exports = router;