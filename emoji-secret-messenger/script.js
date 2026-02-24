// ============================================================
// Emoji Secret Messenger – script.js
// A simple emoji substitution cipher that lets you encode a
// text message into emojis and decode it back to the original.
// ============================================================

// ----------------------------------------------------------
// 1. CIPHER MAP
//    Each supported character maps to a unique emoji.
//    Extend this object to support more characters.
// ----------------------------------------------------------
const CIPHER_MAP = {
  a: "😀", b: "😁", c: "😂", d: "🤣", e: "😃",
  f: "😄", g: "😅", h: "😆", i: "😉", j: "😊",
  k: "😋", l: "😎", m: "😍", n: "🤩", o: "😘",
  p: "😗", q: "😙", r: "😚", s: "🙂", t: "🤗",
  u: "🤔", v: "🤭", w: "🤫", x: "🤥", y: "😶",
  z: "😐",

  // Numbers
  "0": "🔴", "1": "🟠", "2": "🟡", "3": "🟢", "4": "🔵",
  "5": "🟣", "6": "⚫", "7": "⚪", "8": "🟤", "9": "🔶",

  // Special characters
  " ": "🌟",
  "?": "❓",
  "!": "❗",
};

// ----------------------------------------------------------
// 2. REVERSE MAP (auto-generated for decoding)
//    Flip the CIPHER_MAP so emoji → character.
//    We build this once at startup rather than every decode.
// ----------------------------------------------------------
const REVERSE_MAP = {};
for (const [char, emoji] of Object.entries(CIPHER_MAP)) {
  REVERSE_MAP[emoji] = char;
}

// ----------------------------------------------------------
// 3. encodeMessage()
//    Reads the textarea, converts text → emojis.
// ----------------------------------------------------------
function encodeMessage() {
  const input = document.getElementById("inputText").value;

  if (!input.trim()) {
    showResult("⚠️ Please type a message first.");
    return;
  }

  // Convert to lowercase so 'A' and 'a' both map correctly.
  const lower = input.toLowerCase();

  let encoded = "";
  for (const char of lower) {
    // Only encode characters that exist in our map;
    // silently skip anything unsupported.
    if (CIPHER_MAP[char] !== undefined) {
      encoded += CIPHER_MAP[char];
    }
  }

  if (!encoded) {
    showResult("⚠️ No supported characters found to encode.");
    return;
  }

  showResult(encoded);
}

// ----------------------------------------------------------
// 4. decodeMessage()
//    Reads the textarea, converts emojis → original text.
//    Uses Array.from() to safely split multi-byte emoji chars.
// ----------------------------------------------------------
function decodeMessage() {
  const input = document.getElementById("inputText").value.trim();

  if (!input) {
    showResult("⚠️ Please paste an emoji code first.");
    return;
  }

  // Array.from correctly handles multi-byte Unicode characters.
  // Emojis are represented as one or more UTF-16 code units
  // (typically 2–4 bytes, or more when combined with modifier
  // characters), so naive string indexing can split them incorrectly.
  const emojiArray = Array.from(input);

  let decoded = "";
  for (const emoji of emojiArray) {
    if (REVERSE_MAP[emoji] !== undefined) {
      decoded += REVERSE_MAP[emoji];
    }
    // Unknown emojis / characters are silently skipped.
  }

  if (!decoded) {
    showResult("⚠️ Could not decode. Make sure you pasted a valid emoji code.");
    return;
  }

  showResult(decoded);
}

// ----------------------------------------------------------
// 5. copyResult()
//    Copies whatever is in the result box to the clipboard
//    and shows a brief "Copied!" toast notification.
// ----------------------------------------------------------
function copyResult() {
  const resultBox = document.getElementById("resultBox");
  const text = resultBox.textContent;

  // Ignore the placeholder text or warning messages.
  if (!text || text.startsWith("⚠️") || text === "Your result will appear here…") {
    showToast("Nothing to copy!");
    return;
  }

  // The Clipboard API is the modern, recommended way to write to
  // the clipboard. It returns a Promise.
  navigator.clipboard
    .writeText(text)
    .then(() => showToast("Copied to clipboard!"))
    .catch(() => showToast("Copy failed – please copy manually."));
}

// ----------------------------------------------------------
// 6. Helper: showResult(text)
//    Puts text into the result box, replacing placeholder.
// ----------------------------------------------------------
function showResult(text) {
  const resultBox = document.getElementById("resultBox");
  // Clear any existing children (e.g., the placeholder <span>).
  resultBox.textContent = text;
}

// ----------------------------------------------------------
// 7. Helper: showToast(message)
//    Briefly shows a floating toast notification.
// ----------------------------------------------------------
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  // Hide the toast after 2.5 seconds.
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ----------------------------------------------------------
// 8. Wire up buttons using addEventListener (no inline HTML handlers)
// ----------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("encodeBtn").addEventListener("click", encodeMessage);
  document.getElementById("decodeBtn").addEventListener("click", decodeMessage);
  document.getElementById("copyBtn").addEventListener("click", copyResult);
});
