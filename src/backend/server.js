const express = require("express");
const cors = require("cors");
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

let posts = [];

router.post("/posts", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.get("/posts", (req, res) => {
  res.json(posts);
});

router.use((req, res) => {
  res.sendStatus(404);
});

app.use("/api", router);

// Om vi är i utvecklingsläge, starta servern på en port
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

// Exportera appen för användning i Netlify functions
module.exports = app;
