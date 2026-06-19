# ChatBridge

A lightweight chat application built with **vanilla JavaScript** on the frontend and **Express.js** on the backend. Users submit a prompt, the server forwards it to the **OpenAI Chat Completions API**, and the response is displayed back in the UI.

No frontend frameworks, no heavy bloat — just a clean bridge between user input and AI-generated responses.

## Features

- 🧠 Send prompts and get responses from OpenAI's Chat Completions API
- ⚡ Vanilla JS frontend with Vite for fast dev server + HMR
- 🔌 Express backend handling API requests securely (API key never exposed to the browser)
- 🌉 Vite dev proxy to avoid CORS issues between frontend and backend

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Build Tool | Vite |
| Backend | Node.js, Express |
| AI Provider | OpenAI Chat Completions API |

## Project Structure

```
chatbridge/
├── index.html          # Frontend entry point
├── main.js             # Frontend logic (sends prompt, displays response)
├── style.css            # Styling
├── server.js            # Express server (API routes)
├── .env                 # Environment variables (not committed)
├── vite.config.js       # Vite config with API proxy
└── package.json
```

## How It Works

```
Browser (main.js)
      │
      │  fetch('/api/chat', { prompt })
      ▼
Vite Dev Server  ──proxy──▶  Express Server (server.js)
                                    │
                                    │  forwards prompt
                                    ▼
                          OpenAI Chat Completions API
                                    │
                                    ▼
                          Response sent back to browser
```

1. User types a prompt in the UI
2. `main.js` sends a `POST` request to `/api/gift`
3. Vite proxies the request to the Express server
4. Express calls the OpenAI Chat Completions API using the server-side API key
5. The AI's response is sent back and rendered in the browser
