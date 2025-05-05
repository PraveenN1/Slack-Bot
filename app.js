const express = require("express");
// without this, anyone could spoof requests to  app pretending to be Slack, and trigger actions or may leak the data.
const verifySlackRequest = require("./utils/verifySlackRequest");

const slackCommandRoutes = require("./routes/slackCommands");
const slackInteractionRoutes = require("./routes/slackInteractions");

//creates an instance of express app
const app = express();

//middlewares for urlencoded data
app.use("/slack/commands", express.urlencoded({ extended: true }));
app.use("/slack/interactions", express.urlencoded({ extended: true }));
//middleware for json data
app.use(express.json({ verify: verifySlackRequest }));

//middleware to handle routes
app.use("/slack/commands", slackCommandRoutes);
app.use("/slack/interactions", slackInteractionRoutes);

module.exports = app;
