const bcrypt = require("bcrypt");
const userService = require("../services/users_service");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await userService.getUser(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  //create JWT tokens
  const accessToken = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  //saving refresh token in the database with currrent user
  await userService.saveRefreshToken(user.email, refreshToken);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  }); //1 day
  res
    .status(200)
    .json({
      accessToken: accessToken,
      role: user.role,
      companyId: user.companyId,
    });
};

module.exports = { handleLogin };
