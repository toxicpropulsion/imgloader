const request = require("supertest");
const app = require("../app");
const { indexGetHandler } = require("../routes/handlers");

app.get("/", indexGetHandler);

describe("GET /", function() {
  it("should respond with status 200", function(done) {
    request(app)
      .get("/")
      .expect(200, done);
  });
});
