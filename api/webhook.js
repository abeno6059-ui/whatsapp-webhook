export default async function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "mon_token_123";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Forbidden");
  }

  if (req.method === "POST") {
    console.log("===== WEBHOOK CALLED =====");

    const value = req.body?.entry?.[0]?.changes?.[0]?.value;

    console.log("HAS_MESSAGES:", !!value?.messages);
    console.log("HAS_STATUSES:", !!value?.statuses);

    console.log("MESSAGE ID:", value?.messages?.[0]?.id);
console.log("TIMESTAMP:", value?.messages?.[0]?.timestamp);
console.log("TEXT:", value?.messages?.[0]?.text?.body);

    return res.status(200).send("OK");
  }

  return res.status(405).send("Method Not Allowed");
}
