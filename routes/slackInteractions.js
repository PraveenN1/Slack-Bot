const express = require("express");
const router = express.Router();
const { handleInteraction } = require("../controllers/interactionController");

// post route to handle interactions
router.post("/", handleInteraction);

module.exports = router;
