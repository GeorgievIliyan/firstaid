import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// CORS first
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));

app.use(express.json());

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

app.get("/", (req, res) => {
  res.json({ status: "Server running ✓" });
});

// TTS endpoint
app.post("/api/tts", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Use "George" voice or your preferred voice ID
    const audio = await elevenlabs.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
      text: text,
      modelId: "eleven_v3",
      outputFormat: "mp3_44100_128",
    });

    // Convert audio stream to base64
    const arrayBuffer = await new Response(audio).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString("base64");
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

    res.json({
      success: true,
      audioUrl: audioUrl,
      message: "TTS generated",
    });
  } catch (error) {
    res.status(500).json({
      error: "TTS processing failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("Server error:", err);
  res.status(500).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`API Key loaded: ${process.env.ELEVENLABS_API_KEY ? "✓" : "✗"}\n`);
});