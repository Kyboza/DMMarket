const fsPromises = require("fs").promises;
const path = require("path");

const usersDB = {
  users: require("../userData/users.json"),
  setUsers: (data) => {
    usersDB.users = data;
  },
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: true, secure: true });
    return res.sendStatus(204);
  }

  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "userData", "users.json"),
    JSON.stringify(usersDB.users, null, 2)
  );

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.sendStatus(204);
};

module.exports = handleLogout;
