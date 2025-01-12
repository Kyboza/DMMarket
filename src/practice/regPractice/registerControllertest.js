const usersDB = {
  users: require("./users2.json"),
  setUsers: (data) => {
    usersDB.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUserTest = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password)
    return res
      .status(400)
      .json({ message: "Provide all necessary credentials" });

  const duplicateUser = usersDB.find((person) => person.email === email);
  if (duplicateUser) return res.sendStatus(409);

  try {
    const hashedPwd = bcrypt.hash(password, 10);

    const newUser = {
      username: username,
      password: hashedPwd,
      email: email,
      roles: { User: 2001 },
    };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "users2.json"),
      JSON.stringify(usersDB.users, null, 2)
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUserTest };
