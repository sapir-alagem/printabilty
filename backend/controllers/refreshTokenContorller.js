const userService = require("../services/users_service");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  refreshToken = cookies.jwt;

  const user = await userService.getUserByRefreshToken(refreshToken);
  if (!user) {
    return res.status(403).json({ message: "Invalid Token" }); //invalid token
  }

  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.email !== decoded.email) {
      return res.status(403).json({ message: "Unable to verify token" }); //invalid token
    }
    const role = user.role;
    const accessToken = jwt.sign(
      {
        UserInfo: { email: decoded.email, role: role },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ role, accessToken });
  });
};

module.exports = { handleRefreshToken };
