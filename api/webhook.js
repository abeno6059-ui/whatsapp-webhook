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
  console.log("===== WEBHOOK CALLED =====");
  const value = req.body?.entry?.[0]?.changes?.[0]?.value;

console.log("HAS_MESSAGES:", !!value?.messages);
console.log("HAS_STATUSES:", !!value?.statuses);

  if (req.method === "POST") {
  console.log(
  "EVENT:",
  JSON.stringify(req.body.entry?.[0]?.changes?.[0]?.value, null, 2)
);

  return res.status(200).send("OK");
}
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();

    console.log("n8n Status:", response.status);
    console.log("n8n Response:", text);

  } catch (err) {
    console.error("FETCH ERROR:", err);
  }

  return res.status(200).send("OK");
}

  return res.status(405).send("Method Not Allowed");
}
