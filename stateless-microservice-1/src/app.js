const express = require("express");
const app = express();

// Required configs
const APP_NAME = process.env.APP_NAME;
const ENV = process.env.ENVIRONMENT;
const FEATURE_FLAG = process.env.FEATURE_FLAG;

// Secret
const API_KEY = process.env.API_KEY;

// Simulate crash if config missing
if (!APP_NAME || !ENV) {
  console.error("Missing required configuration. Crashing...");
  process.exit(1);
}

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    version: "1.0.0",
    environment: ENV
  });
});

app.get("/config", (req, res) => {
  res.json({
    app: APP_NAME,
    env: ENV,
    featureEnabled: FEATURE_FLAG === "true"
  });
});

app.get("/secret", (req, res) => {
  res.json({
    apiKey: API_KEY ? API_KEY.substring(0, 3) + "***" : "NOT SET"
  });
});

app.listen(3000, () => {
  console.log(`App running on port 3000`);
});
