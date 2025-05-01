const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//initialization
app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
//export app for test purpose

module.exports = app;
if (process.env.NODE_ENV !== "test") {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Store the server instance for testing
    app.server = server;
  });
}
