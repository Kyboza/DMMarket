const bcrypt = require('bcrypt')
const User = require('../models/user');  // Importera din Mongoose modell

const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required' });
  }

  // Kontrollera om användarnamnet eller emailen redan finns
  const duplicateUser = await User.findOne({ username });
  const duplicateEmail = await User.findOne({ email });

  if (duplicateUser) {
    return res.status(409).json({ message: 'Username already in use' });
  }

  if (duplicateEmail) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  try {
    // Hasha lösenordet
    const hashedPwd = await bcrypt.hash(password, 10);

    // Skapa en ny användare
    const newUser = new User({
      username,
      email,
      password: hashedPwd,
      roles: { User: 2001 },  // Standardrollen för en användare
    });

    // Spara användaren i databasen
    await newUser.save();

    res.status(201).json({ message: `New user ${username} created!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export default handleNewUser;

