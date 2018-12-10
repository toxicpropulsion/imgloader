const assert = require("chai").assert;
const { uniquify, validateURL } = require("../utils");

describe("utils.js", function() {
  describe("uniquify(array)", function() {
    it("should return array with no duplicates", function() {
      let arr = uniquify([1, 1, 1, 1, 2, 3, 4, 4, 4, 5]);
      let exp = [1, 2, 3, 4, 5];
      assert.deepEqual(arr, exp);
    });
    it("should return empty array if take empty array", function() {
      assert.deepEqual(uniquify([]), []);
    });
  });

  describe("validateURL(url)", function() {
    it("should return true for valid URLs", function() {
      let tests = [
        "https://duckduckgo.com",
        "https://yandex.ru/",
        "https://yandex.ru/portal/video?stream_active=category&stream_channel=default&stream_category=film&from_block=video-tabs",
        "https://news.ycombinator.com/item?id=18503276",
        "http://google.com/",
        "https://www.google.com/search?q=Video%20Games%20in%20East%20Germany%3A%20The%20Stasi%20Played%20Along",
        "http://google.com/abc/def/qwerty",
        "http://127.0.0.1"
      ];

      tests.forEach(test => {
        assert.isTrue(validateURL(test));
      });
    });
    it("should return false for invalid URLs", function() {
      let tests = [
        "www.google.com",
        "google.com",
        "google",
        "abc",
        "localhost",
        "127.0.0.1"
      ];

      tests.forEach(test => {
        assert.isFalse(validateURL(test));
      });
    });
    it("should return false for empty input", function() {
      let url = validateURL("");
      assert.isFalse(url);
    });
  });
});
