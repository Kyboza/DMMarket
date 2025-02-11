const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./lib/mongodb");  // Make sure this path is correct
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
require("dotenv").config();

const app = express();

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);

// Connect to MongoDB
async function connectDatabase() {
  try {
    const dbConnection = await connectToDB();
    console.log(dbConnection.message);  // Confirm if connected to DB
  } catch (err) {
    console.log("DB Connection failed:", err);
    process.exit(1);  // Exit if DB connection fails
  }
}

connectDatabase();

// Routes (Example route)
const router = express.Router();
router.use("/register", require("./routes/register"));
router.use("/auth", require("./routes/auth"));

// Use JWT Authentication middleware on protected routes
router.use(verifyJWT);

// All routes are prefixed with `/api`
app.use("/api", router);

// Export the app so it can be used by the serverless function
module.exports = app;
