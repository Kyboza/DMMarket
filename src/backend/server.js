const express = require("express");
const cors = require("cors");
const { connectToDB } = require("../lib/mongodb"); 
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
require("dotenv").config();

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);

async function connectDatabase() {
  try {
    const dbConnection = await connectToDB();
    console.log(dbConnection.message);
  } catch (err) {
    console.log("DB Connection failed:", err);
    process.exit(1); 
  }
}

connectDatabase();

const router = express.Router();
router.use("/register", require("./routes/register"));
router.use("/auth", require("./routes/auth"));
router.use("/refresh", require("./routes/refresh"));
router.use("/logout", require("./routes/logout"));
router.use("/emailverification", require("./routes/emailVerification"));
router.use("/verifycode", require("./routes/verifyCode"));
router.use("/new-password", require("./routes/newPassword"));
router.use("/create-checkout-session", require("./routes/paymentRedirect"));


router.use(verifyJWT);

app.use("/api", router);

module.exports = app;
