// Define usersDB
const usersDB = {
  users: require("./users2.json"), // Load users from JSON file
  setUsers: (data) => {
    usersDB.users = data;
  }, // Function to update users in the usersDB
};

// Imports
const nodemailer = require("nodemailer"); // Import nodemailer for sending emails
require("dotenv").config(); // Load environment variables from .env file
const crypto = require("crypto");

// Temporary storage for verification codes
const tempVeriCode = {};

// Function to generate a verification code
const generateVerificationCode = () => {
  return crypto.randomBytes(2).toString("hex");
};

// Sends the mail itself and also authorizes the user and password of the account sending it to the user/ Defines what the mail contains and then finally tells the transporter to send it.
const verifySendMail = async (email, code) => {
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
    subject: `Your reset code from ${process.env.EMAIL_USER}`,
    text: `Your code resets in 5mins and it is ${code}`,
  };

  await transporter.sendMail(mailOptions);
};

// Handles the check to see if everything is right/ Generates the code and stores it inside the temporary storage finally calls the function that sends the mail with the email and code
const handleEmailReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(401);

  const foundUser = usersDB.users.find((person) => person.email === email);
  if (!foundUser) return res.status(401);

  const verificationCode = generateVerificationCode();

  tempVeriCode[email] = {
    code: verificationCode,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  await verifySendMail(email, verificationCode);
};

module.exports = { handleEmailReset, tempVeriCode }; // Export the handleEmailReset function
