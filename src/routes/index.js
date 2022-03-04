const express = require("express");
const router = express.Router();

const { location } = require("../controllers/index.controller")

// @route GET /:code
// @desc Redirect to longUrl

router.get("/:code", location);

module.exports = router;