require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user");  // Importera Mongoose-modellen för användare

const handleNewUser = async (req, res) => {
  const { user, pwd, email } = req.body;

  // Kolla att alla nödvändiga data finns med
  if (!user || !pwd || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required" });
  }

  try {
    // Kolla om användarnamnet redan finns
    const duplicateUser = await User.findOne({ username: user });

    if (duplicateUser) {
      return res.status(409).json({ message: "Username already in use" });
    }

    // Kolla om e-postadressen redan används
    const duplicateEmail = await User.findOne({ email });

    if (duplicateEmail) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hasha lösenordet innan vi sparar användaren
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Skapa en ny användare
    const newUser = new User({
      username: user,
      email: email,
      roles: { User: 2001 }, // Default user role
      password: hashedPwd,
    });

    // Spara användaren i databasen
    await newUser.save();

    // Skicka tillbaka ett svar med successmeddelande
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;
