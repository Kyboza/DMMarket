const usersDB = {
  users: require("./users2.json"),
  setUsers: (data) => {
    usersDB.users = data;
  },
};

const path = require("path");
const fsPromises = require("fs").promises;

const handleLogoutTest = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204);

  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: true, secure: true });
    return res.status(204);
  }

  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };

  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "users2.json"),
    JSON.stringify(usersDB.users, null, 2)
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: true, secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogoutTest };
