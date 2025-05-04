const express = require("express");
const { encode, decode, redirect, getStatistics, getList } = require("../controllers/controllers");
const router = express.Router();

router.get("/list", getList);
router.post("/encode", encode);
router.post("/decode", decode);
router.get("/redirect/:code", redirect);
router.get("/statistics/:code", getStatistics);

module.exports = router;
