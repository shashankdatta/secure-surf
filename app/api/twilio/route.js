export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const phone = searchParams.get("phone");
  const message = searchParams.get("message");

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = require("twilio")(accountSid, authToken);

  try {
    client.messages
      .create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
        to: phone,
      })
      .then((mes) => {
        console.log(`Message SID (String Identifier): ${mes.sid}`);
      });
  } catch (err) {
    return new Response("Twilio Server Error!", {
      status: 400,
    });
  }

  return new Response("Message Sent!", {
    status: 200,
  });
}
