# Recommended local LLMs for code generation

System context: LENOVO 82WR, 13th Gen Intel i9-13900HX (24c / 32t), NVIDIA GeForce RTX 4070 Laptop GPU (~4095 MB VRAM), 32 GB RAM.

Hardware notes:
- CPU inference is primary due to limited VRAM (4 GB). llama.cpp can offload ~20–28 layers to the GPU to assist, but weights mostly live in RAM.
- 32 GB RAM comfortably handles models up to ~18–20 GB (Q4_K_M quantized 32B models are borderline).
- Recommended tool: [llama.cpp](https://github.com/ggerganov/llama.cpp) or [Ollama](https://ollama.com) (wraps llama.cpp).

Below are three tiers tuned to different resource/quality trade-offs.

---

## 1) Easy on the PC — 6–7B class

Best pick: **Qwen2.5-Coder-7B-Instruct Q4_K_M**
- HuggingFace: `bartowski/Qwen2.5-Coder-7B-Instruct-GGUF`
- File: `Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf` (~4.7 GB)
- Why: State-of-the-art code model at 7B; outperforms older CodeLlama 13B on most coding benchmarks. Supports up to 128 k context.
- llama.cpp command:
  ```
  llama-cli -m Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf -ngl 20 -c 8192 -p "Your prompt here"
  ```

Runner-up: **DeepSeek-Coder-6.7B-Instruct Q4_K_M**
- HuggingFace: `TheBloke/deepseek-coder-6.7b-instruct-GGUF`
- File: `deepseek-coder-6.7b-instruct.Q4_K_M.gguf` (~4.2 GB)
- Why: Excellent on fill-in-the-middle (FIM) and code completion tasks; slightly lighter than Qwen 7B.

Also consider: **CodeLlama-7B-Instruct Q4_K_M**
- HuggingFace: `TheBloke/CodeLlama-7B-Instruct-GGUF`
- File: `codellama-7b-instruct.Q4_K_M.gguf` (~4.2 GB)
- Use cases: Quick completions, single-file edits, lightweight autocompletion.
- Notes: Older baseline; superseded by Qwen 7B and DeepSeek 6.7B for most tasks.

---

## 2) Best local balance — 13–14B class

Best pick: **Qwen2.5-Coder-14B-Instruct Q4_K_M**
- HuggingFace: `bartowski/Qwen2.5-Coder-14B-Instruct-GGUF`
- File: `Qwen2.5-Coder-14B-Instruct-Q4_K_M.gguf` (~9.0 GB)
- Why: Major jump in reasoning and multi-file understanding over 7B; fits well within 32 GB RAM. This is the recommended sweet spot for your machine.
- llama.cpp command:
  ```
  llama-cli -m Qwen2.5-Coder-14B-Instruct-Q4_K_M.gguf -ngl 15 -c 8192 -p "Your prompt here"
  ```

Runner-up: **DeepSeek-Coder-V2-Lite-Instruct Q4_K_M** (16B MoE, activates ~2.4B per token)
- HuggingFace: `bartowski/DeepSeek-Coder-V2-Lite-Instruct-GGUF`
- File: `DeepSeek-Coder-V2-Lite-Instruct-Q4_K_M.gguf` (~10.5 GB)
- Why: Mixture-of-Experts architecture gives near-34B quality at 13B inference cost; very strong at multi-step reasoning.

Also consider: **CodeLlama-13B-Instruct Q4_K_M**
- HuggingFace: `TheBloke/CodeLlama-13B-Instruct-GGUF`
- File: `codellama-13b-instruct.Q4_K_M.gguf` (~8.0 GB)
- Notes: Solid older baseline; Qwen 14B is generally preferred unless you need CodeLlama's FIM prompt format.

---

## 3) Heavy — 32–34B class (slow but possible on 32 GB RAM)

Best pick: **Qwen2.5-Coder-32B-Instruct Q4_K_M**
- HuggingFace: `bartowski/Qwen2.5-Coder-32B-Instruct-GGUF`
- File: `Qwen2.5-Coder-32B-Instruct-Q4_K_M.gguf` (~19.8 GB)
- Why: Closes the gap with GPT-4-class coding quality; fits within 32 GB RAM when quantized. Inference will be slow (~1–3 tok/s on CPU).
- llama.cpp command:
  ```
  llama-cli -m Qwen2.5-Coder-32B-Instruct-Q4_K_M.gguf -ngl 5 -c 4096 -p "Your prompt here"
  ```

Runner-up: **DeepSeek-Coder-33B-Instruct Q4_K_M**
- HuggingFace: `TheBloke/deepseek-coder-33b-instruct-GGUF`
- File: `deepseek-coder-33b-instruct.Q4_K_M.gguf` (~20.7 GB)
- Notes: High quality but at the edge of your 32 GB RAM with context overhead; use `-c 2048` to reduce pressure.

Not recommended locally: **CodeLlama-34B / LLaMA 3 — 70B**
- These require >48 GB RAM unquantized, or a GPU with 24+ GB VRAM.
- Approach: use a cloud GPU host (Colab Pro+, RunPod, vast.ai) for these sizes.

---

## Quick decision guide

| Goal | Model | Est. RAM | Tokens/s (CPU) |
|---|---|---|---|
| Fast feedback / autocomplete | Qwen2.5-Coder-7B Q4_K_M | ~5 GB | ~10–18 t/s |
| Best daily driver | Qwen2.5-Coder-14B Q4_K_M | ~10 GB | ~5–9 t/s |
| Max local quality | Qwen2.5-Coder-32B Q4_K_M | ~21 GB | ~1–3 t/s |
| Cloud only | DeepSeek-Coder-V2 / LLaMA 3 70B | >48 GB | — |

## Recommended llama.cpp GPU offload flags
- `-ngl 20` — offload 20 transformer layers to the RTX 4070 (4 GB VRAM); good for 7B models.
- `-ngl 15` — safer for 14B models with 4 GB VRAM and 8 k context.
- `-ngl 5` — minimal offload for 32B models; mostly CPU.
- Tune `-ngl` up/down based on VRAM errors (`CUDA out of memory` → reduce `-ngl`).

## Downloading models (Ollama — easiest path)
```
ollama run qwen2.5-coder:7b
ollama run qwen2.5-coder:14b
ollama run deepseek-coder-v2:16b
```
