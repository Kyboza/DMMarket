const User = require("../../models/user")

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken: refreshToken})
  
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

 foundUser.refreshToken = ''
 await foundUser.save()
 

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.sendStatus(204);
};

module.exports = handleLogout;
