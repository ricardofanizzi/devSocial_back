var express = require('express');
var router = express.Router();
const temas = require('../../models/temas');


// Ruta para obtener todos los usuarios 
router.get('/', (req, res) => {
    temas.getAll()
        .then(rows => {
            res.json(rows)
        })
        .catch(err => console.log(err))
})


// Ruta para obtener un usuario por id
router.get('/:pId', (req, res) => {
    temas.getById(req.params.pId)
        .then(rows => {
            res.json(rows);
        }).catch((err) => {
            res.json({ error: 'Tema no encontrado' });
        })
})


// Ruta de actualizacion de temas

router.post('/update', (req, res) => {
    temas.update(req.body)
        .then(result => {
            console.log(result);
            res.json(result);
        })
});




module.exports = router;