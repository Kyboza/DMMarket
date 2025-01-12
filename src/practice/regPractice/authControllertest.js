const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");
require("dotenv").config();

const usersDB = {
  users: require("./users2.json"),
  setUsers: (data) => {
    usersDB.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Provide all credentials" });

  const foundUser = usersDB.users.find(
    (person) => person.username === username
  );
  if (!foundUser)
    return res.status(401).json({ message: "User does not exist" });

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Password is incorrect" });

  const roles = Object.values(foundUser.roles);

  try {
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };

    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "users2.json"),
      JSON.stringify(usersDB.users, null, 2)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = handleLogin;
