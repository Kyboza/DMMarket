const User = require("../../models/user");
const { verificationCodes } = require("../controllers/resetEmailController");
const bcrypt = require("bcrypt");

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

    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.password = hashedNewPwd;
    await currentUser.save();

    delete verificationCodes[email];

    return res.status(200).json({
      message: `The password for the email: ${email} has been updated`,
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Failed to update user password" });
  }
};

module.exports = handleNewPassword;
