const userService = require('../services/users_service');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({'message': 'Unauthorized'});
    }

    refreshToken = cookies.jwt;

    const user = await userService.getUserByRefreshToken(refreshToken);
    if (!user) {
        return res.status(403).json({'message': 'Forbidden'}); //invalid token
    }

    //evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || user.email !== decoded.email) {
            return res.status(403).json({'message': 'Forbidden'}); //invalid token
        }
        const accessToken = jwt.sign(
            { "email" : decoded.email },
             process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1h' }
        );
        res.status(200).json({ accessToken });
    });
}

module.exports = { handleRefreshToken };