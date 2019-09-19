const express = require("express"); // express is a Node-based library used for creating APIs
require("dotenv").config(); // dotenv automatically gives us access to environment variables (.env) inside this file
const jwt = require("express-jwt"); // Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const checkScope = require("express-jwt-authz"); // Check auth scopes

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true, //cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per min
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"]
});

// instantiates express
const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API!"
  });
});

// below is a private API that checks for a jot (JWT) before allowing access to the url
app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from a private API!"
  });
});

function checkRole(role) {
  // express middleware must return a function that accepts three args. . .next passes control to next middleware item
  return function(req, res, next) {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next(); // signifies success, allows processing to continue
    } else {
      return res.status(401).send("Insufficient role");
    }
  };
}

app.get("/admin", checkJwt, checkRole("admin"), function(req, res) {
  res.json({
    message: "Hello from an admin API!"
  });
});

app.get("/courses", checkJwt, checkScope(["read:courses"]), function(req, res) {
  res.json({
    courses: [
      { id: 1, title: "Building Apps with React and Redux" },
      { id: 2, title: "Creating Reusable React Components" }
    ]
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_API_URL);
