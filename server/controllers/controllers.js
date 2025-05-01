const db = require("../db/db");
const generateCode = require("../utils/generateCode");

const encode = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ error: "Long URL is required" });
    }
    const code = generateCode();
    const shortUrl = `http://short.est/${code}`;
    db[shortUrl] = {
      longUrl,
      shortUrl,
      createdAt: new Date(),
      visits: 0,
    };

    res.status(201).json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { encode };
