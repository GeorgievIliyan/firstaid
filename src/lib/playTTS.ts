export async function playTTS(text: string): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`TTS error: ${response.status} - ${data.error}`);
    }

    if (data.audioUrl) {
      const audio = new Audio(data.audioUrl);
      await audio.play();
    } else {
      throw new Error("No audioUrl in response");
    }
  } catch (error) {
    console.error("TTS playback error:", error);
  }
}