const needle = require("needle");
const cheerio = require("cheerio");
const tress = require("tress");
const urlParser = require("url");
const puppeteer = require("puppeteer");
const shortid = require("shortid");
const { uniquify, validateURL, logger } = require("../utils");

let browser, page;

(async () => {
  browser = await puppeteer.launch({ headless: false });
  logger.log("info", "Chromium launched");
})();

module.exports.indexGetHandler = function(req, res) {
  res.render("index");
};

module.exports.indexPostHandler = function(req, res) {
  let { url } = req.body;
  let links = [];
  let screenshotname, screenshotpath;
  let urlIsValid = validateURL(url);

  if (!urlIsValid) {
    res.status(400).end();
    return false;
  }

  (async () => {
    try {
      page = await browser.newPage();

      logger.log("info", `Open new page, navigating to ${url}`);
      await page.emulateMedia("screen");
      await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });

      const height = await page.evaluate("document.body.scrollHeight");

      await page.setViewport({
        width: 1280,
        height: height
      });

      let uniqid = shortid.generate();
      screenshotpath = `public/screenshots/${uniqid}.png`;
      screenshotname = `/screenshots/${uniqid}.png`;

      await page.screenshot({ path: screenshotpath });

      await links.push(screenshotname);
      result = await uniquify(links);
      await res.status(200).send(result);

      logger.log("info", "Done. Close page");
    } catch (e) {
      logger.log("error", e.message);
      return;
    } finally {
      await page.close();
    }
  })();

  return;

  let protocol = urlParser.parse(url).protocol;
  let hostname = urlParser.parse(url).hostname;

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
