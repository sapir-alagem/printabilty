const userService = require("../services/users_service");

const handleLogout = async (req, res) => {
  // On client also delete the access token

  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(204).json({ message: "No token to delete" });
  }

  const refreshToken = cookies.jwt;
  // is refresh token in db?
  const user = await userService.getUserByRefreshToken(refreshToken);

  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(204).json({ message: "No token to delete" });
  }

  // Delete the refresh token in db
  await userService.saveRefreshToken(user.email, null);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.status(204).json({ message: "Token deleted" });
};

module.exports = { handleLogout };
