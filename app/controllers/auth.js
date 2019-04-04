const config = require('../config');
const { resultJson } = require('./base');
const jwt = require('jsonwebtoken');

const auth = {};

auth.signIn = (req, res, next)  => {
    // Invalid login username not found
    if(req.body.username != config.admin.username 
        || req.body.password != config.admin.password) {
        resultJson.message = 'Username or Password not match'
        return res
            .status(401)
            .json(resultJson);
    }

    
    if(req.body.username == config.admin.username 
        && req.body.password == config.admin.password) {
        resultJson.success = true;
        resultJson.message = 'Congratz, you already signed-in.';
        
        const payload = {
            admin: config.admin.username
        };
        var token = jwt.sign(payload, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        resultJson.token = token;
        console.log(token);
        return res
            .status(200)
            .json(resultJson);
    }
};

auth.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            success: false, message: 'No token provided.'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Fail to Authentication. Error -> ' + err
            });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = auth;