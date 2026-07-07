export default async function handler(req, res) {
  console.log("===== WEBHOOK CALLED =====");
  console.log("METHOD:", req.method);

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
    console.log("BODY:");
    console.log(JSON.stringify(req.body));

    return res.status(200).json({
      success: true,
    });
  }

  return res.status(405).send("Method Not Allowed");
}
