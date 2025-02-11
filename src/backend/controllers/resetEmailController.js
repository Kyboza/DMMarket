require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../../models/user");

const verificationCodes = {};

const generateVerificationCode = () => {
  return crypto.randomBytes(2).toString("hex");
};

const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Here is your reset code ${code}, it expires in 5 minutes`,
  };

  await transporter.sendMail(mailOptions);
};

const handleEmailReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.sendStatus(400);

  const foundUser = await User.findOne({email: email})
  if (!foundUser) return res.sendStatus(404);

  try {
    const verificationCode = generateVerificationCode();

    verificationCodes[email] = {
      code: verificationCode,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    await sendVerificationEmail(email, verificationCode);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleEmailReset, verificationCodes };
