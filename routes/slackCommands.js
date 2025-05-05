const express = require("express");
const router = express.Router();
const { openApprovalModal } = require("../controllers/commandController");

// post route to open modal after triggering the /approve-test command
router.post("/", openApprovalModal);

module.exports = router;
