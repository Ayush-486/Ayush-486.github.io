# Emoji Secret Messenger 🔐

A beginner-friendly, client-side web app that lets you encode a text message into a sequence of emojis and share it with a friend who can decode it back to the original text — all in the browser, no server required.

## What It Does

- **Encode** – Type any message and click **Encode** to transform it into a secret emoji sequence.
- **Decode** – Paste the emoji sequence and click **Decode** to reveal the hidden message.
- **Copy Result** – Click **Copy Result** to copy the emoji code (or decoded text) to your clipboard so you can share it.

## How to Run

1. Clone or download this repository.
2. Open `emoji-secret-messenger/index.html` in any modern web browser.
3. No build step, no server, no dependencies — it just works!

## How Encoding Works

The app uses a **substitution cipher**: every supported character is replaced by a unique emoji according to a fixed lookup table defined in `script.js`.

| Character | Emoji | Character | Emoji |
|-----------|-------|-----------|-------|
| a | 😀 | 0 | 🔴 |
| b | 😁 | 1 | 🟠 |
| … | … | … | … |
| space | 🌟 | ? | ❓ |
| ! | ❗ | | |

- Text is converted to **lowercase** before encoding so `"Hello"` and `"hello"` produce the same output.
- Unsupported characters (e.g. punctuation not in the map) are silently skipped.
- Decoding rebuilds the reverse map automatically at startup — no manual maintenance needed.

## Project Structure

```
emoji-secret-messenger/
├── index.html   # Page structure (title, textarea, buttons, result box)
├── style.css    # Dark neon theme, responsive layout
├── script.js    # Cipher logic: encodeMessage, decodeMessage, copyResult
└── README.md    # This file
```

## Technologies Used

- Plain HTML5
- Plain CSS3 (no frameworks)
- Vanilla JavaScript (ES6+)

No external libraries or frameworks are used.
