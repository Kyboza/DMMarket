const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const verifyRoles = require("./middleware/verifyRoles");
require("dotenv").config();

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger);

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/emailverification", require("./routes/emailVerification"));
app.use("/verifycode", require("./routes/verifyCode"));
app.use("/new-password", require("./routes/newPassword"));
app.use("/create-checkout-session", require("./routes/paymentRedirect"));

app.use(verifyJWT);

let posts = [];

app.post("/posts", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.use((req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
