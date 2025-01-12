const usersDB = {
  users: require("../userData/users.json"),
  setUsers: (data) => {
    usersDB.users = data;
  },
};

const { verificationCodes } = require("../controllers/resetEmailController");
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");

const handleNewPassword = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  if (!email || !newPassword || !confirmNewPassword) {
    return res
      .status(400)
      .json({ message: "Provide the new password and confirm it" });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!verificationCodes[email]) {
    return res
      .status(400)
      .json({ message: "No verification code found for this email" });
  }

  const storedCode = verificationCodes[email];
  const storedCodeExpired = Date.now() > storedCode.expiresAt;

  if (storedCodeExpired) {
    return res.status(401).json({
      message: "Reset window has expired, request a new verification code",
    });
  }

  try {
    const hashedNewPwd = await bcrypt.hash(newPassword, 10);

    const otherUsers = usersDB.users.filter((person) => person.email !== email);
    const currentUser = usersDB.users.find((person) => person.email === email);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = { ...currentUser, password: hashedNewPwd };

    usersDB.setUsers([...otherUsers, updatedUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "userData", "users.json"),
      JSON.stringify(usersDB.users, null, 2)
    );

    delete verificationCodes[email];

    return res.status(200).json({
      message: `The password for the email: ${email} has been updated`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user password" });
  }
};

module.exports = handleNewPassword;
