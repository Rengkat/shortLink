const express = require("express");
const { encode } = require("../controllers/controllers");
const router = express.Router();

router.post("/encode", encode);

module.exports = router;
