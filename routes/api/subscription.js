const express = require('express');
const Subscription = require('../../models/subscription');
const middleware = require('../middleware');

const router = express.Router();

router.post('/state', async (req, res) => {
    const result = await Subscription.getByTemaState(req.body);
    res.send(result)
});

router.post('/updatestate', async (req, res) => {
    const result = await Subscription.updateState(req.body);
    const sub = await Subscription.getByTemaState(req.body);
    console.log(sub)
    res.json(sub)
});

router.use(middleware.checkToken);

router.post('/insert', async (req, res) => {
    req.body.idUser = req.userId
    const result = await Subscription.insert(req.body);
    res.send(result)
});



module.exports = router