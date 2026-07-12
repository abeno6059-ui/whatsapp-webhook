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

    // تجاهل أي حدث ما فيهش رسالة
    if (!value?.messages) {
      return res.status(200).send("OK");
    }

    try {
      const response = await fetch(
        "https://incom-dora15.app.n8n.cloud/webhook/whatsapp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      console.log("n8n Status:", response.status);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }

    return res.status(200).send("OK");
  }

  return res.status(405).send("Method Not Allowed");
}
