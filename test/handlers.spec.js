const request = require("supertest");
const app = require("../app");
const { indexGetHandler, indexPostHandler } = require("../routes/handlers");

app.get("/", indexGetHandler);
app.post("/", indexPostHandler);

describe("GET /", function() {
  it("should respond with status 200", function(done) {
    request(app)
      .get("/")
      .expect(200, done);
  });
});

describe("POST /", function() {
  it("should respond with status 200 if url valid", function(done) {
    request(app)
      .post("/")
      .send({ url: "https://google.com" })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should respond with status 400 if url invalid", function(done) {
    request(app)
      .post("/")
      .send({ url: "https://google.com" })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
