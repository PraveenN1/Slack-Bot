const slackService = require('../services/slackService');

const handleInteraction = async (req, res) => {
  try {
    // controller to handle the received request from the requester
    const payload = JSON.parse(req.body.payload);
    // console.log(payload);
    if (payload.type === "view_submission" && payload.view.callback_id === "approval_modal") {
      
      //extract approver,approvalText and requester from the payload received
      const approver = payload.view.state.values.approver_select.approver.selected_user;
      const approvalText = payload.view.state.values.approval_text.text.value;
      const requester = payload.user.id;

      //method to send the approval request message 
      await slackService.approvalRequest(approver, requester, approvalText);
     
      res.json({ response_action: "clear" });

    }
    //controller to handle the block actions by the approver
    else if (payload.type === "block_actions") {
      const action = payload.actions[0];
      const { requester, status } = JSON.parse(action.value);

      //method to  notify requester about the approval result 
      await slackService.notifyRequester(requester, status, payload.user.id);
      res.status(200).send();
    } else {
      res.status(200).send();
    }
  } catch (error) {
    console.error("Error handling interaction:", error);
    res.status(500).send("Error processing interaction");
  }
};

module.exports = { handleInteraction };
