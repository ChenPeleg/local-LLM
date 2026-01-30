# Local LLM in VS Code - Setup Plan

## 1. Environment Setup
- Download and install LM Studio
- Launch LM Studio and download a model (e.g., Llama 2, Mistral)
- Start the local server (default: localhost:8000 or 11434)

## 2. VS Code Extension
- Install **Continue** extension (best for LM Studio)
  - Or **Codeium** / **GitHub Copilot** alternatives (if they support local APIs)
- Continue supports OpenAI-compatible APIs (which LM Studio provides)

## 3. Connection Configuration
- LM Studio runs on localhost:8000 by default (OpenAI-compatible API)
- Configure Continue extension to point to `http://localhost:8000/v1`
- Test connection in Continue chat

## 4. Optimization & Testing
- Configure model parameters (temperature, context length, etc.)
- Test code completion, chat, and generation features
- Handle performance; adjust model size if needed

## 5. Customization (Optional)
- Set up custom prompts/system messages
- Configure keyboard shortcuts
- Enable/disable features as needed

## Success Criteria
- ✓ LLM responds to queries in VS Code
- ✓ Code completion/suggestions working
- ✓ Reasonable response times
