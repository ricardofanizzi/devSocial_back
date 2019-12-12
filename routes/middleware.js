const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    console.log(req.headers)
    if (!req.headers['user_token'])
        return res.json({
            error: "You must include the header"
        });

    const token = req.headers['user_token'];
    let payload = null
    try {
        payload = jwt.decode(token, process.env.TOKEN_KEY)
    } catch (err) {
        return res.json({
            error: 'Invalid token'
        });
    }

    if (moment().unix() > payload.expiresAt) {
        return res.json({ error: 'Expired token' });
    };

    req.userId = payload.userId;

    next();
};

module.exports = {
    checkToken: checkToken
}