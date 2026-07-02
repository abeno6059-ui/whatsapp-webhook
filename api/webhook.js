export default async function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "mon_token_123";

    const { ["hub.mode"]: mode, ["hub.verify_token"]: token, ["hub.challenge"]: challenge } = req.query;

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Forbidden");
  }

  if (req.method === "POST") {
    try {
      console.log("Received webhook:", JSON.stringify(req.body));

      const response = await fetch(
        "https://personnel2026what2026ak.app.n8n.cloud/webhook/whatsapp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      const text = await response.text();
      console.log("n8n response:", response.status, text);

      return res.status(200).send("EVENT_RECEIVED");
    } catch (err) {
      console.error("Webhook error:", err);
      return res.status(500).send(err.message);
    }
  }

  return res.status(405).send("Method Not Allowed");
}
