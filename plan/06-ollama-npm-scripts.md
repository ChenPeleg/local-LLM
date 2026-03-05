# Plan: Add Ollama npm scripts to package.json

## Goal

Add three npm scripts that manage the Ollama server and model from the command line.

---

## Target model

**Qwen2.5-Coder-14B-Instruct Q4_K_M** — the recommended mid-range model from plan 05.
- Ollama tag: `qwen2.5-coder:14b`
- Est. RAM usage: ~10 GB | Tokens/s (CPU): ~5–9 t/s

---

## Scripts to add

### 1. `ollama:install` — pull the model

```json
"ollama:install": "ollama pull qwen2.5-coder:14b"
```

Downloads the model weights locally via Ollama.  
Only needs to be run once (or to update the model).

---

### 2. `ollama:start` — start the server

Ollama reads two relevant environment variables:

| Variable | Purpose |
|---|---|
| `OLLAMA_MODELS` | Path where model weights are stored |
| `OLLAMA_HOST` | Address the server listens on (default `127.0.0.1:11434`) |

Create a `.env.ollama` file in the project root to hold local overrides:

```
# .env.ollama
OLLAMA_MODELS=C:\Users\<you>\ollama-models
OLLAMA_HOST=127.0.0.1:11434
```

Proposed script (Windows — reads the env file then starts the server):

```json
"ollama:start": "node -e \"require('fs').readFileSync('.env.ollama','utf8').split('\\n').filter(l=>l&&!l.startsWith('#')).forEach(l=>{const[k,...v]=l.split('=');process.env[k.trim()]=v.join('=').trim()});\" && ollama serve"
```

> **Simpler alternative** — use the `dotenv-cli` package:
> ```
> npm install --save-dev dotenv-cli
> ```
> Then the script becomes:
> ```json
> "ollama:start": "dotenv -e .env.ollama -- ollama serve"
> ```

The server starts in the foreground. Press `Ctrl+C` to stop it, or use `ollama:stop` from another terminal.

---

### 3. `ollama:stop` — stop the server

On Windows, Ollama runs as a process named `ollama.exe`:

```json
"ollama:stop": "taskkill /IM ollama.exe /F"
```

On macOS/Linux the equivalent would be `pkill ollama`, but this project targets Windows.

---

## Final `scripts` section in package.json

```json
"scripts": {
  "dev": "cn --config qwen.yaml",
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "echo \"started\"",
  "fibonacci": "node src/fibonacci.ts",
  "ollama:install": "ollama pull qwen2.5-coder:14b",
  "ollama:start": "dotenv -e .env.ollama -- ollama serve",
  "ollama:stop": "taskkill /IM ollama.exe /F"
}
```

---

## Files to create / update

| File | Action |
|---|---|
| `package.json` | Add three scripts above |
| `.env.ollama` | Create with `OLLAMA_MODELS` and `OLLAMA_HOST` values |
| `.gitignore` | Add `.env.ollama` if it contains personal paths |

---

## Usage

```bash
# First time only — download the model (~9 GB)
npm run ollama:install

# Start the server (reads .env.ollama for config)
npm run ollama:start

# From a second terminal — stop the server
npm run ollama:stop
```
