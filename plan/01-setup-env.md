# Local LLM in VS Code - Execution Checklist

## 1. Download & Install LM Studio
- [x] Download LM Studio from [https://lmstudio.ai](https://lmstudio.ai)
- [x] Run the installer (Windows .exe)
- [x] Complete installation with default settings
- [x] Launch LM Studio application

## 2. Download a Model in LM Studio
- [x] Open LM Studio application
- [x] Click "Search models" or "Browse" tab
- [x] Search for and select a model:
  - Downloaded: `qwen/qwen3-vl-8b`
- [x] Click "Download" and wait for completion (5-50GB depending on model)
- [x] Verify download is 100% complete

## 3. Start LM Studio Server
- [ ] In LM Studio, select the downloaded model
- [ ] Click "Start Server" button
- [ ] Verify server shows: `Server is running on http://localhost:8000`
- [ ] Test connection: Open browser and go to `http://localhost:8000/v1/models`
  - Should see the model listed in JSON response

## 4. Install Continue Extension in VS Code
- [ ] Open VS Code
- [ ] Go to Extensions (Ctrl+Shift+X)
- [ ] Search for "Continue"
- [ ] Install extension by `Continue.dev`
- [ ] Reload VS Code when prompted
- [ ] Verify Continue icon appears in activity bar (left sidebar)

## 5. Configure Continue Extension
- [ ] Click Continue icon in VS Code sidebar
- [ ] Click settings icon (⚙️) or "Models" tab
- [ ] Add API configuration:
  ```json
  {
    "model": "Your selected model name",
    "title": "LM Studio",
    "provider": "openai",
    "apiBase": "http://localhost:8000/v1",
    "apiKey": "any-key"
  }
  ```
- [ ] Save configuration

## 6. Test Connection
- [ ] In Continue chat, type: `/models` (should show your model)
- [ ] Send a simple test message: "Hello, what is 2+2?"
- [ ] Verify response appears in chat window
- [ ] Test code generation: "Write a Python hello world"

## 7. Configure Model Parameters (Optional)
- [ ] In LM Studio server settings, adjust:
  - Temperature: 0.7 (default, good balance)
  - Max tokens: 2048 (or adjust based on use)
  - Context length: depends on model (check model card)
- [ ] Apply changes and restart server if needed

## 8. Verify Full Functionality
- [ ] [ ] Test inline chat: `Ctrl+Shift+M` in editor + write comment
- [ ] [ ] Test code generation: highlight code → right-click → Continue
- [ ] [ ] Test slash commands: `/edit`, `/codebase`, `/share`
- [ ] [ ] Verify response times are acceptable (< 5-10 seconds per response)

## Success Validation
- ✓ LM Studio server running (`http://localhost:8000`)
- ✓ Continue extension installed and configured
- ✓ Test message gets response from local model
- ✓ VS Code shows generated code/completions
- ✓ No API key errors or connection timeouts
