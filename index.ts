import { LMStudioClient } from "@lmstudio/sdk";
const client = new LMStudioClient();

const model = await client.llm.model("qwen/qwen3-vl-8b");
const result = await model.respond("What is the meaning of life?");

console.info(result.content);