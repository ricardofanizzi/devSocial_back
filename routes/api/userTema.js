const express = require('express');
const UserTema = require('../../models/user_temas');

const router = express.Router();



router.post('/insert', async (req, res) => {
    const result = await UserTema.insert(req.body);
    res.json(result);
});


module.exports = router