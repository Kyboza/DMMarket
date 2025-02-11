const mongoose = require("mongoose");
require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("Could not get MONGO ENV VARIABLE");
  throw new Error("Could not get MONGO ENV VARIABLE");
}

async function connectToDB() {
  try {
    const connection = await mongoose.connect(MONGO_URI, { dbName: "DMMarket" });
    if (!connection) {
      console.log("DB Connection error");
      throw new Error("Could not connect to DB");
    }
    console.log("Connected to MongoDB");
    return { success: true, message: "Connected" };
  } catch (error) {
    console.log("Could not connect to DB", error);
    throw error;
  }
}

module.exports = { connectToDB };
