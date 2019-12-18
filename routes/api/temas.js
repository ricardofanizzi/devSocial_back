var express = require('express');
var router = express.Router();
const temas = require('../../models/temas');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');

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

router.post('/update', async (req, res) => {
    const result = await temas.update(req.body)
    const row = await temas.getById(req.body.id)
    res.json(row)

});

router.post('/create', multipartMiddleware, async (req, res) => {
    let content = fs.readFileSync(req.files.imagen.path)
    let extension = req.files.imagen.type.split('/')[1];
    let nombre = Date.now();
    fs.writeFileSync('./public/images/' + nombre + '.' + extension, content)
    // res.json({ succes: 'Todo Correcto' })
    req.body.especializacion = [req.body.perfil1, req.body.perfil2, req.body.perfil3, req.body.perfil4, req.body.perfil5]
    req.body.imgUrl = nombre + "." + extension;
    temas.insert(req.body)
        .then(result => {
            res.json(result)
        })
})


module.exports = router;