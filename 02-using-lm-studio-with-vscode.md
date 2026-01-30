# Using LM Studio Server with VS Code

This guide explains how to effectively use LM Studio's local server with VS Code for AI-assisted coding.

## Table of Contents
1. [Overview](#overview)
2. [Starting the LM Studio Server](#starting-the-lm-studio-server)
3. [Using with Continue Extension](#using-with-continue-extension)
4. [Using with LM Studio SDK](#using-with-lm-studio-sdk)
5. [Common Workflows](#common-workflows)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Overview

LM Studio provides two main ways to interact with local LLMs in VS Code:
- **Continue Extension**: AI chat and code assistant directly in VS Code
- **LM Studio SDK**: Programmatic access via TypeScript/JavaScript

Both methods connect to the LM Studio server running locally on your machine.

## Starting the LM Studio Server

### Method 1: Using LM Studio GUI
1. Open LM Studio application
2. Select your downloaded model from the list
3. Click the "Start Server" button
4. The server will start on `http://localhost:8000` (default)
5. Keep LM Studio running while you use VS Code

### Method 2: Using CLI (Command Line)
```bash
# Load a model and start the server
lms load qwen/qwen3-vl-8b --identifier "qwen"
lms server start --port 8000
```

### Verify Server is Running
Open your browser and navigate to:
```
http://localhost:8000/v1/models
```
You should see a JSON response listing your loaded model.

## Using with Continue Extension

The Continue extension provides an AI assistant interface directly in VS Code.

### Configuration
1. Open VS Code
2. Install the "Continue" extension from the marketplace
3. Click the Continue icon in the left sidebar
4. Click the settings/gear icon
5. Add this configuration in your `config.json`:

```json
{
  "models": [
    {
      "model": "qwen/qwen3-vl-8b",
      "title": "LM Studio Local",
      "provider": "openai",
      "apiBase": "http://localhost:8000/v1",
      "apiKey": "not-needed"
    }
  ]
}
```

### Using Continue Features

#### Chat Interface
- Click the Continue icon to open the chat panel
- Type your questions or requests
- Example: "Explain what this function does"
- The AI will respond using your local model

#### Inline Code Assistance
1. **Generate Code**:
   - Type a comment describing what you want: `// Create a function to calculate fibonacci`
   - Press `Ctrl+Shift+M` (or Cmd+Shift+M on Mac)
   - Continue will generate the code

2. **Edit Existing Code**:
   - Highlight code you want to modify
   - Right-click → "Continue" → "Edit"
   - Describe the changes you want
   - Review and accept the suggestions

3. **Explain Code**:
   - Highlight code
   - Right-click → "Continue" → "Explain"
   - Get a detailed explanation

#### Slash Commands
Continue supports several slash commands in the chat:
- `/edit` - Edit highlighted code
- `/comment` - Add comments to code
- `/share` - Share conversation
- `/codebase` - Ask questions about your codebase
- `/file` - Reference a specific file

Example:
```
/edit Make this function async and add error handling
```

## Using with LM Studio SDK

For programmatic access, you can use the LM Studio SDK directly in your TypeScript/JavaScript code.

### Setup
```bash
npm install @lmstudio/sdk
```

### Basic Usage

#### Simple Query
```typescript
import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient();
const model = await client.llm.model("qwen/qwen3-vl-8b");
const result = await model.respond("What is the meaning of life?");

console.log(result.content);
```

#### Streaming Responses
```typescript
import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient();
const model = await client.llm.model("qwen/qwen3-vl-8b");

const prediction = model.respond("Write a short poem about coding");

for await (const fragment of prediction) {
  process.stdout.write(fragment);
}
```

#### Chat Conversation
```typescript
import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient();
const model = await client.llm.model("qwen/qwen3-vl-8b");

const conversation = model.createConversation();

await conversation.send("Hello! I'm working on a React app.");
const response1 = await conversation.getLastResponse();
console.log("AI:", response1.content);

await conversation.send("How do I handle forms?");
const response2 = await conversation.getLastResponse();
console.log("AI:", response2.content);
```

### API Endpoints
When the LM Studio server is running, you can also use standard OpenAI-compatible endpoints:

```typescript
// Using fetch API
const response = await fetch('http://localhost:8000/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'qwen/qwen3-vl-8b',
    messages: [
      { role: 'user', content: 'Hello, how are you?' }
    ],
    temperature: 0.7,
    max_tokens: 1000
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

## Common Workflows

### Workflow 1: Code Generation with Context
1. Start LM Studio server with your model
2. Open your project in VS Code
3. Open Continue chat panel
4. Use `/codebase` to ask questions about existing code
5. Generate new code based on your project structure
6. Review and integrate the generated code

### Workflow 2: Code Review and Refactoring
1. Open a file you want to refactor
2. Highlight the code section
3. Use Continue's "Edit" feature with a prompt like:
   - "Refactor this to use async/await"
   - "Add error handling"
   - "Optimize for performance"
4. Review the suggestions and apply them

### Workflow 3: Learning and Documentation
1. Highlight unfamiliar code
2. Use Continue's "Explain" feature
3. Ask follow-up questions in the chat
4. Generate documentation comments with `/comment`

### Workflow 4: Debugging Assistance
1. Paste error messages into Continue chat
2. Ask: "Why am I getting this error?"
3. Share relevant code snippets
4. Get debugging suggestions and fixes

## Troubleshooting

### Server Connection Issues

**Problem**: "Failed to connect to server"
- **Solution**: Ensure LM Studio server is running
- Check server status: `lms server status`
- Verify the port: Default is 8000
- Check firewall settings

**Problem**: "Model not found"
- **Solution**: Verify model name matches exactly
- List loaded models: `lms ps`
- Check model identifier in LM Studio

### Performance Issues

**Problem**: Slow responses
- **Reduce context length**: Lower the max_tokens parameter
- **Adjust temperature**: Use lower values (0.3-0.5) for faster, more deterministic responses
- **Use smaller model**: Consider a quantized or smaller model variant
- **Check system resources**: Ensure sufficient RAM/VRAM

**Problem**: Out of memory errors
- **Solution**: 
  - Close other applications
  - Use a smaller model
  - Reduce context window size
  - Enable GPU offloading in LM Studio settings

### Continue Extension Issues

**Problem**: Extension not responding
- **Solution**:
  - Restart VS Code
  - Check Continue extension logs (Output panel → Continue)
  - Verify configuration in `~/.continue/config.json`
  - Reinstall the extension

**Problem**: Wrong model responding
- **Solution**: 
  - Check `config.json` model name matches loaded model
  - Restart LM Studio server
  - Clear Continue cache

## Best Practices

### 1. Model Selection
- **Small models (3B-7B)**: Fast, good for simple tasks, code completion
- **Medium models (8B-13B)**: Balanced performance, good for general coding
- **Large models (30B+)**: Best quality, slower, for complex reasoning

### 2. Prompt Engineering
- Be specific and clear in your requests
- Provide context about your project
- Use examples when possible
- Break complex tasks into smaller requests

**Good prompt**:
```
Create a TypeScript function that:
1. Accepts an array of numbers
2. Filters out negative values
3. Returns the sum of remaining numbers
4. Includes error handling for invalid input
```

**Bad prompt**:
```
make a function
```

### 3. Server Management
- Start the server before opening VS Code for best experience
- Keep LM Studio running in the background
- Use CLI commands for automated workflows
- Monitor server logs: `lms log stream`

### 4. Resource Management
- Close the server when not in use to free resources
- Use appropriate model size for your hardware
- Monitor CPU/GPU usage
- Consider using quantized models (Q4, Q5) for better performance

### 5. Privacy and Security
- All processing happens locally - no data sent to cloud
- Models and conversations stay on your machine
- Safe for working with proprietary code
- No API keys or internet connection required (after model download)

### 6. Efficient Workflows
- Use keyboard shortcuts for faster access (Ctrl+Shift+M for Continue)
- Save common prompts as snippets
- Use slash commands for quick actions
- Chain multiple requests for complex tasks

## Advanced Configuration

### Custom Model Parameters

In Continue's `config.json`, you can customize model behavior:

```json
{
  "models": [
    {
      "model": "qwen/qwen3-vl-8b",
      "title": "LM Studio Local",
      "provider": "openai",
      "apiBase": "http://localhost:8000/v1",
      "apiKey": "not-needed",
      "completionOptions": {
        "temperature": 0.5,
        "top_p": 0.9,
        "max_tokens": 2048,
        "stop": ["\n\n", "###"]
      }
    }
  ]
}
```

Parameters:
- `temperature` (0.0-1.0): Controls randomness (lower = more focused)
- `top_p` (0.0-1.0): Nucleus sampling threshold
- `max_tokens`: Maximum response length
- `stop`: Sequences that stop generation

### Multiple Models
You can configure multiple models for different tasks:

```json
{
  "models": [
    {
      "model": "small-fast-model",
      "title": "Fast Completion",
      "provider": "openai",
      "apiBase": "http://localhost:8000/v1",
      "completionOptions": {
        "temperature": 0.3,
        "max_tokens": 500
      }
    },
    {
      "model": "large-smart-model",
      "title": "Deep Analysis",
      "provider": "openai",
      "apiBase": "http://localhost:8000/v1",
      "completionOptions": {
        "temperature": 0.7,
        "max_tokens": 4096
      }
    }
  ]
}
```

## Resources

- [LM Studio Official Documentation](https://lmstudio.ai/docs)
- [LM Studio CLI Reference](https://lmstudio.ai/docs/cli)
- [Continue Extension Documentation](https://continue.dev/docs)
- [LM Studio SDK GitHub](https://github.com/lmstudio-ai/lmstudio.js)

## Getting Help

- LM Studio Discord: Join the community for support
- Continue Extension: GitHub issues for bug reports
- Check server logs: `lms log stream` for debugging

---

**Next Steps**: 
- Experiment with different models to find the best fit
- Try various Continue features to enhance your workflow
- Explore the LM Studio SDK for custom integrations
- Join the community to share tips and learn from others
