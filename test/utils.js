const assert = require("chai").assert;
const { uniquify } = require("../utils");

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
});
