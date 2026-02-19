## Connecting to LLMStudio

To connect your local LLM instance with LLMStudio, follow these steps:

1. **Install LLMStudio**: Download and install LLMStudio from [https://www.llmstudio.ai](https://www.llmstudio.ai) if you haven't already.

2. **Configure Connection**: Open LLMStudio and navigate to the "Local Models" or "Connect to Local Server" section. Enter the IP address and port of your local LLM server (e.g., `localhost:1234`).

3. **Verify Connection**: Test the connection by selecting your local model from the available options. If successful, you'll be able to use your local LLM within LLMStudio's interface.

This is the current setup:

```yaml
name: Local config
version: 0.0.1
schema: v1

models:
  - name: qwen/qwen3-vl-8b
    provider: lmstudio
    model: qwen/qwen3-vl-8b
    apiBase: http://localhost:8000/v1 # if running a remote instance of LM Studio

```

