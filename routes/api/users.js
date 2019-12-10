const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const middlewares = require('../middleware')
const Users = require('../../models/users');

//GETS  
/* Ruta principal de acceso a todos los usuarios */

//POSTS
/* Ruta para registro de usuario */
router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await Users.insert(req.body);
        res.json(result);
        console.log(req.body);
    }
    catch (err) {
        console.log(err)
    }
});

router.post('/login', async (req, res) => {
    const user = await Users.getByEmail(req.body.email)
    if (user === undefined) {
        res.json({
            error: 'Error, email or password not found'
        })
    } else {
        const equals = bcrypt.compareSync(req.body.password, user.password);
        if (!equals) {
            res.json({
                error: 'Error, email or password not found'
            });
        } else {
            res.json({
                succesfull: createToken(user),
                done: 'Login correct'
            });
        }
    }
});

router.use(middlewares.checkToken)


router.get('/main', (req, res) => {
    Users.getById(req.userId)
        .then(rows => {
            console.log(rows)
            res.json(rows);
        })
        .catch(err => console.log(err));
});

router.get('/', (req, res) => {
    Users.getAll()
        .then(rows => {
            res.json(rows);
        })
        .catch(err => console.log(err));
});

/* Ruta de acceso a todos los usuarios activos */
router.get('/active', (req, res) => {
    Users.getAllActive(true)
        .then(rows => {
            res.json(rows);
        })
        .catch(err => console.log(err));
});

/* Ruta de acceso a usuario por ID */
router.get('/:idUsuario', (req, res) => {
    console.log(req.userId);
    Users.getById(req.params.idUsuario)
        .then(row => {
            res.json(row)
        })
        .catch(err => console.log(err))
});


const createToken = (user) => {
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
};

module.exports = router;