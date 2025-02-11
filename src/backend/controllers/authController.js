const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const foundUser = await User.findOne({ username: user });

    if (!foundUser) {
      console.log("User not found:", user);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (!match) {
      console.log("Password mismatch"); 
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const roles = Object.values(foundUser.roles || []);

    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" } 
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save(); 

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleLogin;
