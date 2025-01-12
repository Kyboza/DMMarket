const usersDB = {
  users: require("./users2.json"),
  setUsers: (data) => {
    usersDB.users = data;
  },
};

const { tempVeriCode } = require("./resetEmailControllertest");
const bcrypt = require("bcrypt");
const path = require("path");
const fsPromises = require("fs").promises;

const handleNewPassword = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;
  if (!email || !newPassword || !confirmNewPassword) return res.sendStatus(401);

  if (newPassword !== confirmNewPassword) return res.sendStatus(400);

  const foundUser = usersDB.users.find((person) => person.email === email);
  if (!foundUser) return res.sendStatus(401);

  if (!tempVeriCode[email]) return res.sendStatus(401);

  const storedCode = tempVeriCode[email];
  const expiredCode = Date.now() > storedCode.expiresAt;

  if (expiredCode) return res.sendStatus(403);

  try {
    const newHashedPwd = await bcrypt.hash(newPassword, 10);

    const otherUsers = usersDB.users.filter(
      (person) => person.email !== foundUser.email
    );
    const currentUser = { ...foundUser, password: newHashedPwd };

    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "users2.json"),
      JSON.stringify(usersDB.users, null, 2)
    );

    delete tempVeriCode[email];

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = handleNewPassword;
