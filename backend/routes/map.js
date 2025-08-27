const express = require("express");
const router = express.Router();
const mapController = require("../controllers/mapController");
const authMiddleware = require("../middleware/auth"); // import your cookie-based auth

// Protect all routes with middleware
router.post("/coordinates",  authMiddleware, mapController.getAddressCoordinate);
router.post("/distance", authMiddleware, mapController.getDistanceTime);
router.post("/autocomplete", authMiddleware, mapController.getAutoCompleteSuggestions);

module.exports = router;
 