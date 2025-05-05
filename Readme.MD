# Slack Bot 

A Slack bot built using Node.js and Express.js to manage simple approval workflows within Slack workspace.
![Alt Text]("Slack-Bot Architecture.png")

## Features

- Slash command `/approval-test` to trigger the approval process.
- Opens a modal with:
  - A dropdown of Slack users to select the approver.
  - A textarea for entering approval details.
  - A submit button.
- Sends message to approver with `Approve` and `Reject` buttons.
- Notifies requester of approver’s decision.

## Architecture

Slack App
 -  /slack/commands → Opens modal with user and text input
 -  /slack/interactions → Handles modal submit and button actions
 -  WebClient (Slack API)
 -  Views (Modals & Messages)
 -  Controllers (Business logic)
 -  Utils (Slack request validation)

## Tech Stack

- Node.js
- Express.js
- Slack Web API's
- ngrok 

## Folder Structure

```bash
├── app.js 
├── routes
│ └── slack.js
├── controllers
│ └── slackController.js
├── utils
│ └── verifySlackRequest.js
├── .env
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/PraveenN1/slack-bot.git
cd slack-bot
```

Install dependencies
```bash
npm install
```
Create .env file
```bash
SLACK_BOT_TOKEN=your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
```
Expose your local server using ngrok
```bash
ngrok http 3000
```
Copy the HTTPS forwarding URL (e.g., https://xxxx.ngrok.io) and update your Slack App Slash Commands and Interactivity URL 

Run the bot
```bash
node app.js
```

## Author
- Github: PraveenN1 
- Email: praveenpu46@gmail.com
