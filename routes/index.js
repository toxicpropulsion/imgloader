const express = require("express");
const router = new express.Router();
const { indexPostHandler, indexGetHandler } = require("./handlers");

router.get("/", indexGetHandler);
router.post("/", indexPostHandler);

module.exports = router;
