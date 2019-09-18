// express is a Node-based library used for creating APIs
const express = require("express");
// dotenv automatically gives us access to environment variables (.env) inside this file
require("dotenv").config();

// instantiates express
const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API!"
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_API_URL);
