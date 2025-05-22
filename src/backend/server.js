
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("../lib/mongodb");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const { logger } = require("./middleware/logEvents");

const app = express();


// 1. Hantera credentials innan CORS
app.use(credentials);

// 2. CORS måste komma tidigt
app.use(cors(corsOptions));

// 3. Parser och logg
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);

// === Anslut databas ===
async function connectDatabase() {
  try {
    const dbConnection = await connectToDB();
    console.log(dbConnection.message);
  } catch (err) {
    console.error("DB Connection failed:", err);
    process.exit(1);
  }
}
connectDatabase();

// === Routes ===
const router = express.Router();

// Publika routes (ingen JWT)
router.use("/register", require("./routes/register"));
router.use("/auth", require("./routes/auth"));
router.use("/refresh", require("./routes/refresh"));
router.use("/logout", require("./routes/logout"));
router.use("/emailverification", require("./routes/emailVerification"));
router.use("/verifycode", require("./routes/verifyCode"));
router.use("/new-password", require("./routes/newPassword"));
router.use("/create-checkout-session", require("./routes/paymentRedirect"));

// JWT skyddade routes efter detta
router.use(verifyJWT);

// Mount router på /api
app.use("/api", router);

// === Starta server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
