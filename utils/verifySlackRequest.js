const crypto = require("crypto");

const verifySlackRequest = (req, res, buf) => {
  // console.log(req.headers);
  //extract headers- (to verify authenticity)
  const slackSignature = req.headers["x-slack-signature"];
  const requestTimestamp = req.headers["x-slack-request-timestamp"];
  
  // builds baseString
  const baseString = `v0:${requestTimestamp}:${buf.toString()}`;
  // creates a hash string with sha256 encryption method
  const hmac = crypto.createHmac("sha256", process.env.SLACK_SIGNING_SECRET);
  hmac.update(baseString);
  const calculated = `v0=${hmac.digest("hex")}`;

  //compares slack-provided signature and the one calculated in timing-safe throws error if dont match
  if (!crypto.timingSafeEqual(Buffer.from(slackSignature), Buffer.from(calculated))) {
    res.status(400).send("Invalid signature");
    throw new Error("Slack signature verification failed");
  }
};

module.exports = verifySlackRequest;
