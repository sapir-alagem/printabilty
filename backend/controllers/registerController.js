const userService = require("../services/users_service");
const emailService = require("../services/email_service");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, role, companyId } = req.body;
  if (!email || !role || !companyId) {
    return res.status(400).json({ message: "email, role and companyId are requierd" });
  }

  //check for duplicate email in the database
  const duplicateUser = await userService.isUserExist(email);
  if (duplicateUser) {
    return res.status(409).json({ message: "email already exists" });
  }

  const password = Math.random().toString(36).slice(-8);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userService.createUser({ email, hashedPassword, role, companyId });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: error.message });
  }
  try {
    emailService.sendEmail(email, password);
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
