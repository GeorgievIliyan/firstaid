import { Router } from "express";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const router = Router();

const apiKey = process.env.ELEVENLABS_API_KEY;

if (!apiKey) {
  throw new Error("ELEVENLABS_API_KEY missing");
}

const elevenlabs = new ElevenLabsClient({ apiKey });

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    const audioStream = await elevenlabs.textToSpeech.convert("vnewfQdVVk9Y9DZWVRNm", {
      text,
      voiceSettings: {
        stability: 0.1,           // Lower = more emotion/variation
        similarityBoost: 0.75,    // Higher = closer to original voice
      },
      modelId: "eleven_multilingual_v2",
    });

    const chunks: Buffer[] = [];

    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk));
    }

    const audioBuffer = Buffer.concat(chunks);

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audioBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS failed" });
  }
});

export default router;