## Local LLM with Ollama + Continue

This project uses [Ollama](https://ollama.com) as the local model server and the [Continue](https://www.continue.dev) VS Code extension as the IDE integration.

### Prerequisites

1. **Install Ollama**: Download and install Ollama from [https://ollama.com](https://ollama.com).
2. **Install the Continue extension**: Search for `Continue` in the VS Code Extensions panel and install it.

### Recommended model

See [plan/05-configure-ollama.md](plan/05-configure-ollama.md) for full model tier recommendations tuned to this machine's hardware (Intel i9-13900HX, RTX 4070 Laptop 4 GB VRAM, 32 GB RAM).

The recommended sweet-spot model is **Qwen2.5-Coder-14B-Instruct Q4_K_M**:

```
ollama pull qwen2.5-coder:14b
```

### npm scripts

See [plan/06-ollama-npm-scripts.md](plan/06-ollama-npm-scripts.md) for the full script details. Quick reference:

| Script | Purpose |
|---|---|
| `npm run ollama:install` | Pull the model weights (run once) |
| `npm run ollama:start` | Start the Ollama server |
| `npm run ollama:stop` | Stop the Ollama server |

### Continue configuration

The `continue-config.yaml` file at the root of this repo wires Continue to the running Ollama server:

```yaml
name: Local config
version: 0.0.1
schema: v1

models:
  - name: Qwen2.5-Coder 14B
    provider: ollama
    model: qwen2.5-coder:14b
    apiBase: http://localhost:11434
```

Continue will pick this file up automatically when the extension is active. Start the Ollama server (`npm run ollama:start`) before using Continue in VS Code.

