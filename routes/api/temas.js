var express = require('express');
var router = express.Router();
const temas = require('../../models/temas');

router.get('/', (req, res) => {
    temas.getAll()
        .then(rows => {
            res.json(rows)
        })
        .catch(err => console.log(err))
})

router.get('/:pId', (req, res) => {
    temas.getById(req.params.pId)
        .then(rows => {
            res.json(rows)
        }).catch((err) => {
            res.json({ error: 'Tema no encontrado' });
        })
})

router.post('/', (req, res) => {

})

module.exports = router;