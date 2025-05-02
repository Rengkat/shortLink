const express = require("express");
const { encode, decode } = require("../controllers/controllers");
const router = express.Router();

router.post("/encode", encode);
router.post("/decode", decode);

module.exports = router;
