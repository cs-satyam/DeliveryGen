// routes/vrp.js
const express = require("express");
const router = express.Router();
const vrpController = require("../controllers/vrpController");
const auth = require("../middleware/auth");

router.post("/solve", auth, vrpController.solve);
router.get("/jobs/:id", auth, vrpController.getJobStatus); // optional for async

module.exports = router;
