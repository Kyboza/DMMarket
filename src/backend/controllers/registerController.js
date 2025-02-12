require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../../models/user") 

const handleNewUser = async (req, res) => {
  const { user, pwd, email } = req.body;

  if (!user || !pwd || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required" });
  }

  try {
    const duplicateUser = await User.findOne({ username: user });

    if (duplicateUser) {
      return res.status(409).json({ message: "Username already in use" });
    }

    const duplicateEmail = await User.findOne({ email });

    if (duplicateEmail) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10); //Kolla upp vad 10 faktiskt är

    const newUser = new User({
      username: user,
      email: email,
      roles: { User: 2001 },
      password: hashedPwd,
    });

    await newUser.save();

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;
