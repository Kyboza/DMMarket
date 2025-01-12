const { tempVeriCode } = require("./resetEmailControllertest");

const handleVerifyCodeTest = (req, res) => {
  const { code } = req.body;
  if (!code) return res.sendStatus(400);

  const emailEntry = Object.keys(tempVeriCode).find((email) => {
    const storedCode = tempVeriCode[email];
    return code == storedCode.code;
  });

  if (!emailEntry) return res.sendStatus(400);

  const storedCode = tempVeriCode[emailEntry];
  const expiredCode = Date.now() > storedCode.expiresAt;

  if (expiredCode) {
    delete tempVeriCode[emailEntry];
    return res.sendStatus(403);
  }

  return res.sendStatus(200);
};

module.exports = handleVerifyCodeTest;
