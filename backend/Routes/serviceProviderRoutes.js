const express = require("express");
const router = express.Router();
const serviceProviderController = require("../Controller/serviceProviderController");

// Endpoint to assign a job to the nearest service provider based on location, accepted work, and registration
router.post("/assignJob", serviceProviderController.assignJob);
router.post("/CreateProvider", serviceProviderController.CreateProvider);

module.exports = router;
