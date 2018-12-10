const url = require("url");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const loggerFormat = printf(info => {
  return `[${info.timestamp}] [${info.level}]: ${info.message}`;
});

module.exports.uniquify = function(arr) {
  let res = [];
  arr.map(item => {
    if (!res.includes(item)) res.push(item);
  });
  return res;
};

module.exports.validateURL = function(link) {
  let result = url.parse(link);
  if (result.hostname) {
    return true;
  } else {
    return false;
  }
};

module.exports.logger = createLogger({
  level: "info",
  format: combine(timestamp(), loggerFormat),
  transports: [
    new transports.File({ filename: "logs/combined.log" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.Console({
      format: combine(timestamp(), colorize(), loggerFormat)
    })
  ]
});
