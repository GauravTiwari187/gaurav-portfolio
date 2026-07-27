// Thin wrapper around the browser's built-in SpeechSynthesis (Web Speech API).
// No API key required — works fully client-side.

export function speak(text) {
  if (!("speechSynthesis" in window) || !text) return;
  window.speechSynthesis.cancel(); // stop any current utterance
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function isSpeechSupported() {
  return "speechSynthesis" in window;
}
