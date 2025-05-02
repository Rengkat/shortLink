const express = require("express");
const { encode, decode, redirect } = require("../controllers/controllers");
const router = express.Router();

router.post("/encode", encode);
router.get("/decode", decode);
router.get("/redirect", redirect);

module.exports = router;
