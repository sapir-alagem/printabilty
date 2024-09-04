const userService = require("../services/users_service");

const handleLogout = async (req, res) => {

  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(204).json({ message: "No token to delete" });
  }

  const refreshToken = cookies.jwt;
  const user = await userService.getUserByRefreshToken(refreshToken);

  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(204).json({ message: "No token to delete" });
  }

  await userService.saveRefreshToken(user.email, null);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.status(204).json({ message: "Token deleted" });
};

module.exports = { handleLogout };
