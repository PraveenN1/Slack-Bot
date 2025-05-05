//to create a new instance of the WebClient class
const { WebClient } = require("@slack/web-api");
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

// function to open the modal when /approve-test command is triggered
const openModal = async (trigger_id) => {
  return await web.views.open({ // view.open(api method) to open a modal
    trigger_id,
    //modal view
    view: {
      type: "modal",
      callback_id: "approval_modal",
      //modal title
      title: { 
        type: "plain_text", 
        text: "Approval Request" },
      //submit button
      submit: { 
        type: "plain_text", 
        text: "Submit" },

      blocks: [
        //block to select the approver 
        {
          type: "input",
          block_id: "approver_select",
          label: { 
            type: "plain_text", 
            text: "Select Approver" 
          },
          element: { 
            type: "users_select", 
            action_id: "approver" 
          },
        },
        //block to enter the approval text or message
        {
          type: "input",
          block_id: "approval_text",
          label: { 
            type: "plain_text", 
            text: "Approval Text" },
          element: {
            type: "plain_text_input",
            multiline: true,
            action_id: "text",
          },
        },
      ],
    },
  });
};

//after the submit button is triggered from the modal approval request is sent to the approver
const approvalRequest = async (approver, requester, text) => {
  //chat.postMessage( web api method) to post a message 
  return await web.chat.postMessage({
    channel: approver,
    text: `<@${requester}> has requested approval:\n>${text}`,
    //post message body
    blocks: [
      //approval request message block
      {
        type: "section",
        text: { 
          type: "mrkdwn", 
          text: `*Approval Request from <@${requester}>:*\n>${text}` },
      },
      //to approve and reject  buttons for the request 
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { 
              type: "plain_text", 
              text: "Approve" },
            style: "primary",
            action_id: "approve",
            value: JSON.stringify({ requester, status: "approved" }),
          },
          {
            type: "button",
            text: { 
              type: "plain_text", 
              text: "Reject" },
            style: "danger",
            action_id: "reject",
            value: JSON.stringify({ requester, status: "rejected" }),
          },
        ],
      },
    ],
  });
};

const notifyRequester = async (requester, status, approver) => {
  //chat.postMessage(web api method) that returns the approval message on submission
  return await web.chat.postMessage({
    channel: requester,
    text: `Your request has been *${status}* by <@${approver}>.`,
  });
};

module.exports = {
  openModal,
  approvalRequest,
  notifyRequester,
};
