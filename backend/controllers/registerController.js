const userService = require("../services/users_service");
const emailService = require("../services/email_service");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, role, companyId } = req.body;

  if (!email || !role || !companyId) {
    return res
      .status(400)
      .json({ message: "email, role and companyId are required" });
  }

  try {
    const duplicateUser = await userService.isUserExist(email);
    if (duplicateUser) {
      return res.status(409).json({ message: "email already exists" });
    }

    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    await userService.createUser({ email, hashedPassword, role, companyId });

    await emailService.sendEmail(email, password);

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error handling new user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleNewUser };
