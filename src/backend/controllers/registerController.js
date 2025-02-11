require("dotenv").config();
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");

const usersDB = {
  users: require("../userData/users.json"),
  setUsers: (data) => {
    usersDB.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd, email } = req.body;

  if (!user || !pwd || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required" });
  }

  const duplicateUser = usersDB.users.find(
    (person) => person.username === user
  );
  const duplicateEmail = usersDB.users.find((person) => person.email === email);

  if (duplicateUser) {
    return res.sendStatus(409);
  }

  if (duplicateEmail) {
    return res.status(409).json({ message: "Email already in use" });
  }

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = {
      username: user,
      email: email,
      roles: { User: 2001 },
      password: hashedPwd,
    };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "userData", "users.json"),
      JSON.stringify(usersDB.users, null, 2)
    );

    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;
