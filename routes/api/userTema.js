const express = require('express');
const router = express.Router();
const userTema = require('../../models/user_temas');



router.post('/insert', async (req, res) => {
    const result = await userTema.insert(req.body);
    res.json(result);
});


module.exports = router