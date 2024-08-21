const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({'message': 'Unauthorized'});
    }
    console.log(authHeader); // Bearer <token>
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({'message': 'Forbidden'}); //invalid token
        }
        req.user = user.email;
        next();
    });
}

module.exports = verifyJWT;