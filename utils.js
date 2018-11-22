const url = require("url");

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
