require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  
  if (!cookies?.jwt) {
    return res.sendStatus(401); 
  }

  const refreshToken = cookies.jwt;
  try {
    
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.sendStatus(403); 

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        return res.sendStatus(403); 
      }

      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" } 
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500); 
  }
};

module.exports = handleRefreshToken;
