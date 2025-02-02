const { verificationCodes } = require("../controllers/resetEmailController");

const handleVerifyCode = (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Verification code is required" });
  }

  const emailEntry = Object.keys(verificationCodes).find((email) => {
    const storedCode = verificationCodes[email];
    return storedCode.code === code;
  });

  if (!emailEntry) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  const storedCode = verificationCodes[emailEntry];

  if (Date.now() > storedCode.expiresAt) {
    delete verificationCodes[emailEntry];
    return res.status(400).json({ message: "Verification code has expired" });
  }

  return res.status(200).json({
    message: "Verification code is valid",
    email: emailEntry,
  });
};

module.exports = handleVerifyCode;
