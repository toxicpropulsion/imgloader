const needle = require("needle");
const cheerio = require("cheerio");
const tress = require("tress");
const urlParser = require("url");
const { uniquify, validateURL } = require("../utils");

module.exports.indexGetHandler = function(req, res) {
  res.render("index");
};

module.exports.indexPostHandler = function(req, res) {
  let { url } = req.body;
  let links = [];
  let protocol = urlParser.parse(url).protocol;
  let hostname = urlParser.parse(url).hostname;

  if (!validateURL(url)) {
    res.status(400).end();
    return false;
  }

  const q = tress(function(url, done) {
    needle.get(url, function(err, res) {
      if (err) throw err;

      let $ = cheerio.load(res.body);

      $("img").each((i, elem) => {
        if ($(elem).attr("src")) {
          let link = $(elem).attr("src");
          if (link.startsWith(protocol)) {
            links.push(link);
          } else {
            links.push(`${protocol}//${hostname}/${link}`);
          }
        }
      });

      done();
    });
  }, 10);

  q.success = function(data) {
    console.log("Job done");
  };

  q.error = function(err) {
    console.log(`ERROR: ${err}`);
  };

  q.drain = function() {
    let result = uniquify(links);
    res.status(200).send(result);
  };

  q.push(url);
};
