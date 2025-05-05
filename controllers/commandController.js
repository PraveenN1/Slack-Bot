const slackService = require('../services/slackService');

const openApprovalModal = async (req, res) => {
  const { trigger_id } = req.body;
  // console.log(trigger_id);
  try {
    await slackService.openModal(trigger_id);
    res.status(200).send();
  } catch (error) {
    console.error("Error opening modal:", error);
    res.status(500).send("Failed to open modal");
  }
};

module.exports = { openApprovalModal };
