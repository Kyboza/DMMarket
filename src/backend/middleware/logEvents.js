const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    const logsDir = path.join(__dirname, "..", "logs");

    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    await fsPromises.appendFile(path.join(logsDir, logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

module.exports = { logger, logEvents };
