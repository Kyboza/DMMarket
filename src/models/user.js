const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  roles: {
    User: { type: Number, default: 2001 },
  },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
});

// Skapa eller använd redan existerande User-modell
const User = mongoose.models.user || mongoose.model("User", userSchema, "users");

module.exports = User;
