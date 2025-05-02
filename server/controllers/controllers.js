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

const decode = async (req, res) => {
  try {
    const { shortUrl } = req.body;
    if (!shortUrl) {
      return res.status(400).json({ error: "Short URL is required" });
    }

    const urlEntry = db[shortUrl];

    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.json({ longUrl: urlEntry.longUrl });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
//
const redirect = (req, res) => {
  const { code } = req.params;
  const shortUrl = `http://short.est/${code}`;
  const urlEntry = db[shortUrl];

  if (!urlEntry) {
    return res.status(404).json({ error: "URL not found" });
  }

  urlEntry.visits++;
  res.redirect(urlEntry.longUrl);
};
const getStatistics = (req, res) => {
  const { code } = req.params;
  const shortUrl = `http://short.est/${code}`;
  const urlEntry = db[shortUrl];

  if (!urlEntry) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.status(200).json({
    shortUrl: urlEntry.shortUrl,
    longUrl: urlEntry.longUrl,
    visits: urlEntry.visits,
    createdAt: urlEntry.createdAt,
    lastAccessed: new Date(),
  });
};

const getList = (req, res) => {
  const urlList = Object.values(db);
  res.status(200).json(urlList);
};
module.exports = { encode, decode, redirect, getStatistics, getList };
