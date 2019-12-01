var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const Users = require('../../models/users');

//GETS
/* Ruta principal de acceso a todos los usuarios */
router.get('/', (req, res) => {
    Users.getAll()
    .then(rows=>{
        res.json(rows);
    })
    .catch(err => console.log(err));
});

/* Ruta de acceso a todos los usuarios activos */
router.get('/active', (req, res) => {
    Users.getAllActive(true)
    .then(rows=>{
        res.json(rows);
    })
    .catch(err => console.log(err));
});

/* Ruta de acceso a usuario por ID */
router.get('/:idUsuario', (req, res) => {
    Users.getById(req.params.idUsuario)
    .then(row => {
        res.json(row)
    })
    .catch(err => console.log(err))
});

//POSTS
/* Ruta para registro de usuario */
router.post('/register', async (req, res) => {
    try{
        const result = await Users.insert(req.body);
        res.json(result)
        console.log(req.body)
    }
    catch(err){
        console.log(err)
    }
});



module.exports = router;