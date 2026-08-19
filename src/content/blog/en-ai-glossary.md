---
title: 'Common AI Terms: Concepts, Vendors, and Tools in One Place'
description: 'From starter concepts to real-world tooling: token, context, RAG, Agent, MCP; major vendors and model tiers; coding tools, orchestration platforms, and deployment — with plain-language analogies.'
pubDate: 'Aug 19 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
lang: 'en'
category: 'ai'
---

When I started with AI, the thing that nearly made me quit wasn't the theory — it was the wall of unfamiliar words. This post gathers the common terms, from core concepts to vendors and models to hands-on tooling, into one reference, with plain-language analogies where they help. Not exhaustive, just understandable.

> This field moves fast — model numbers and leaderboards flip every few months. Just remember the names roughly; the point is the concepts. **Concepts are stable; model numbers are fluid.**

## 1. Concepts & core techniques
### 1. Core concepts

- **Token**: the smallest unit a model processes; one token ≈ 0.75 English words. Both pricing and context length are counted in tokens. *Like* a taxi charging by the kilometer — a long message is a long ride.
- **Context window**: the max tokens a model can "read" at once; anything over gets truncated or forgotten. *Like* a desk — pile on new material and the old gets pushed off, which is why a model "forgets" the start of a long chat.
- **Parameters**: the number of weights inside a model; "7B"/"70B" = 7/70 billion. *Like* neural connections in a brain — more is usually smarter, but pricier and slower.
- **Prompt**: the instruction you give the model. The clearer it is, the better the output.
- **System prompt**: the developer's preset "persona and rules," higher priority than user input. *Like* an employee handbook.
- **Zero-shot / Few-shot**: asking with no examples (zero-shot) vs. giving a few examples first (few-shot). *Like* a cold exam vs. seeing two worked problems first.
- **Prompt engineering**: systematically designing and tuning prompts for reliable output. Common moves: state role and goal, give examples (few-shot), ask it to reason before answering (CoT), break into steps. *It's* the craft of stating what you want clearly, not gambling.
- **Context engineering**: a bigger idea than prompt engineering — curating *what goes into the context window*: retrieved material (RAG), memory, tool results, compaction — so the model has exactly enough at each step. *Like* setting up the model's whole workbench, not just writing one good sentence.
- **Temperature**: controls randomness. Low = steady/conservative (code, data); high = varied/creative (naming, brainstorming).
- **Top-p (nucleus sampling)**: another randomness knob — the model only picks from the top-probability cluster of words. Tune this or temperature, not both.
- **Streaming**: output comes token by token instead of all at once. *Like* thinking out loud — feels faster.
- **Embedding**: turning text into numbers where similar meanings sit close. *Like* tagging each sentence with coordinates — the basis of search and RAG.
- **Pre-training**: building the base model on massive data; extremely expensive, usually only big labs. *Like* someone who read an entire library growing up.
- **Fine-tuning / LoRA**: continuing to train on a small, specific dataset to fit a task or style; LoRA is a lightweight method that trains only a few added parameters, saving cost and memory.
- **Inference**: the model actually running to generate output — as opposed to training. *Like* sitting the real exam after studying.

### 2. Core techniques and capabilities

- **RAG (Retrieval-Augmented Generation)**: retrieve relevant material first, then feed it into the prompt. *Scenario*: a support bot searches the product docs, then answers from what it found — so it answers about *your* company instead of making things up.
- **Knowledge base**: the curated material you feed a model (docs, internal wiki, PDFs), usually chunked, embedded, and stored in a vector DB — RAG's source. *Like* a private little library for the model.
- **The full RAG pipeline** — one retrieval-QA chain in six steps:
  1. **Chunking**: split long docs into pieces. Too big won't fit and hurts retrieval; too small loses context.
  2. **Embedding**: turn each chunk into a vector, store in a vector DB.
  3. **Retrieval**: embed the user's question too, find the closest chunks.
  4. **Rerank**: re-score the retrieved chunks, keep the most relevant, drop the filler.
  5. **Generation**: feed the chosen material + question to the model to answer.
  6. **Context management**: control how much and in what order goes into the window — too much overflows or dilutes (see "context engineering" above).
- **Common RAG tuning**: when answers are off, work these knobs — ① **chunk strategy**: change size, add overlap, split by meaning/headings not raw character count; ② **upgrade the embedding model**: a stronger, better-fit model boosts retrieval accuracy immediately; ③ **add a reranker**: an extra re-scoring pass surfaces the most relevant chunks; ④ advanced: **hybrid search** (keyword + vector), **query rewriting** (have the model rewrite the question to search better).
- **Agent**: an AI that plans, calls tools, and executes multi-step tasks on its own. *Scenario*: "book the cheapest bullet train to Shanghai next week" — it checks schedules, compares prices, and books, end to end.
- **Function calling / Tool use**: the model calling external functions or APIs as needed. *Like* pulling out a calculator when it can't do the math — the foundation of agents.
- **Harness**: the whole "shell" wrapped around a model — giving it tools, feeding context, controlling the loop and permissions — turning a text generator into an agent that gets work done. *Like* giving a brain hands and a toolbox. Claude Code and Codex *are* harnesses.
- **Workflow (orchestration)**: stringing multi-step agent tasks into a deterministic flow (order, parallel vs. serial, how many loops) so complex work is controllable and reproducible. Unlike letting the model improvise, a workflow is a scripted plan. *Like* an assembly line vs. one person winging it.
- **MCP (Model Context Protocol)**: an open protocol for connecting models to tools and data sources uniformly. *Like* a "USB port for AI" — connect Jira, Slack, or a database without reinventing the wheel each time.
- **Multimodal**: handling text, images, audio, and video together. *E.g.* photograph your fridge and ask "what can I cook."
- **Chain of Thought (CoT) / reasoning models**: prompting the model to reason step by step before concluding; models specialized for this are "reasoning models" (o-series, DeepSeek-R1). *Like* showing your work instead of guessing.
- **RLHF (Reinforcement Learning from Human Feedback)**: tuning a model with human preference scores so it behaves. *Like* training a pet with treats.
- **MoE (Mixture of Experts)**: the model splits into "experts," activating only some each time. *Like* hospital departments — only the relevant doctors get called — big model, less compute.
- **Distillation**: a large model teaches a smaller, cheaper, faster one. *Like* a master training an apprentice.
- **Quantization**: compressing weights from high to low precision (16-bit → 4-bit) to save memory. *Like* compressing HD video to SD — much smaller, slightly lower quality, still usable.
- **Reranker**: after RAG retrieves candidates, a model re-scores and reorders them to improve what's fed to the model.
- **Guardrails**: a safety/compliance filter layer on a model's input and output.

### 3. Insider jargon

- **Hallucination**: the model confidently making things up. *E.g.* ask which page of a book something is on and it invents a page number and quote that sound right but are fake.
- **Alignment**: making a model's behavior match human values and intent. *Like* setting rules for a very capable intern.
- **Jailbreak**: clever wording to bypass safety limits and get output it should refuse.
- **Emergence**: abilities that appear only once a model gets large enough. *Like* water suddenly boiling at 100°C — quantity into quality.
- **Scaling law**: capability improves predictably with more parameters, data, and compute — "bigger is better."
- **AGI**: AI that can handle any task like a human — still a goal, not a reality.
- **Benchmark gaming**: optimizing to top a leaderboard, which doesn't always mean a better real experience.
- **Open vs. closed weights**: whether weights are public. Closed (GPT, Claude, Gemini) = API-only; open (Llama, Qwen, DeepSeek) = download and self-host. *Like* a restaurant selling dishes vs. handing you the recipe.



## 2. Vendors & models



With the concepts down, here's who the names behind them are, which models they make, and who each is for.

> Model numbers move fast — treat the below as the rough landscape. Learn the **vendor + tier logic**; **concepts are stable, model numbers are fluid.**

### 1. Major vendors and flagship models

- **OpenAI**: the closed-source benchmark. The current GPT-5.6 line splits into **Sol** (complex professional work), **Terra** (balanced price-performance), and **Luna** (low-cost, high-volume), plus a security-focused Cyber, GPT Image, realtime voice, etc. The **o-series** has historically been the reasoning-focused line.
- **Anthropic**: known for safety alignment, long context, and coding. Current flagship **Claude Fable 5** (for long-running agents, most capable), then **Opus 5** (complex agentic coding / enterprise), **Sonnet 5** (best speed–intelligence balance), and **Haiku 4.5** (fastest, near-frontier). Tier logic: Opus strongest, Sonnet balanced, Haiku fastest.
- **Google**: strong at multimodal and very long context. **Gemini** comes as **Pro** (top reasoning/coding), **Flash** (low-latency, price-performance), **Flash-Lite** (cheapest/fastest), and **Nano** (on-device); current lines are Gemini 3.x and 2.5. Companions: **Veo** (video), **Imagen / Nano Banana** (images).
- **Meta**: the **Llama** series, flagbearer of open weights, spawning countless community derivatives.
- **Mistral**: French lab, open + commercial in parallel, small but sharp.
- **DeepSeek**: Chinese lab, broke out on price-performance and strong reasoning/coding, big open-source impact (version history below).
- **Alibaba · Qwen**: a main Chinese open-weight line, broad matrix, active community.
- **ByteDance · Doubao**: consumer apps and low-cost API.
- **Moonshot · Kimi**: made its name on very long context.
- **Zhipu · GLM**: academic-rooted, research + commercial.
- **xAI · Grok**: Musk's lab, tightly tied to X (Twitter).

### 2. Consumer-facing AI apps/products

Above are the "engines" (models); here are the "cars" ordinary people use directly.

- **ChatGPT** (OpenAI): the product that brought AI mainstream; now with search, image, voice, and agents.
- **Claude** (Anthropic): a chat product strong at writing, coding, and long documents.
- **Gemini App** (Google): deeply integrated with search and the Android/office ecosystem.
- **Perplexity**: an "AI search / answer engine" — searches and answers with source citations, great for research.
- **Grok** (xAI): built into X, strong on real-time, looser in style.
- **Poe** (Quora): one entry point aggregating many models.
- **NotebookLM** (Google): turns your uploaded material into a Q&A notebook (and podcasts).
- **In China**: Doubao, Kimi, Tongyi, Ernie Bot, Tencent Yuanbao, etc.

### 3. Case study: DeepSeek's model evolution

Watching one real model evolve beats memorizing names.

- **V2.5** (2024-09): merged the old Chat and Coder into one — general + code.
- **V3** (2024-12): major `deepseek-chat` upgrade, 671B MoE architecture, big general gains.
- **R1** (2025-01): first reasoning model with a "thinking mode," big math/code jumps, went global on open weights + price-performance.
- **V3.1** (2025-08): hybrid architecture — one model does both thinking and non-thinking modes.
- **V3.1-Terminus** (2025-09): fixed Chinese-English mixing, stronger Code/Search agents.
- **V3.2** (2025-12, after an Exp preview): stable release, thinking and non-thinking modes separated.
- **V4-Flash** (2026-07): public beta, speed-focused, big agent gains.
- **V4-Pro** (2026-08): official release, peak agent performance, adjustable thinking strength (low / high / max).

Arc: **general (V2.5→V3) → reasoning (R1) → thinking/non-thinking unified (V3.1→V3.2) → strong agents (V4)**.


## 3. Tools & platforms



Concepts down, models known — this post is about actually getting work done: from tools that write code, to platforms that build apps, to how you run it all.

### 1. AI coding tools

- **GitHub Copilot**: the first AI code completion to go mainstream, prompting as you type. *Like* a buddy autocompleting your next line.
- **Cursor**: an AI-native editor (a VS Code fork) built around chat-driven edits and whole-repo understanding.
- **Claude Code**: Anthropic's command-line AI coding agent — reads/writes across files, runs commands, completes multi-step tasks (evolution below).
- **OpenAI Codex**: OpenAI's AI coding agent line. The name has history: early Codex was the code model powering Copilot; today **Codex** means OpenAI's coding agent, with a CLI (Codex CLI), IDE integrations, and a cloud version — it understands a whole repo, writes code, runs tests, and fixes bugs, backed by GPT models. Positioned against Claude Code.
- **Aider**: an AI pair-programmer in the terminal that reads/writes your git repo and auto-commits — for CLI folks.
- **Windsurf / Cline**: similar AI coding tools/plugins focused on agent-style automatic edits.
- **v0 / Bolt / Lovable**: "describe it and get a frontend/whole app" AI site-builders.
- **Vibe coding**: emerging slang for building mostly by instructing an AI in natural language and writing little code yourself.

> On Windows, CLI tools (Claude Code / Codex / Aider) feel closest to Mac/Linux via **WSL2 + Windows Terminal**.

### 2. Orchestration and low-code platforms

Wire up models, tools, data, and flows visually — build AI apps with little or no code.

- **Dify**: an open-source LLMOps platform — visually build RAG knowledge bases, agents, and workflows, then publish as an API or chat app. Great for standing up enterprise AI apps fast.
- **n8n**: open-source workflow automation (a beefed-up Zapier) — drag-and-drop to connect apps and AI nodes, self-host friendly.
- **Coze** (ByteDance): a visual platform for building chatbots/agents, with domestic and global versions.
- **Flowise**: open-source, LangChain-based visual drag-and-drop builder.
- **Zapier / Make**: veteran automation platforms, now with AI nodes.

### 3. Frameworks and ecosystem

- **LangChain**: one of the most popular frameworks for LLM apps — chains prompts, models, tools, memory, and retrieval. *Like* Lego bricks for AI apps.
- **LlamaIndex**: a framework focused on data ingestion and retrieval, specialized in feeding private data to a model (common in RAG).
- **LangGraph**: LangChain's advanced library for orchestrating complex, loop-capable agent flows as a graph.
- **Vector database**: stores embeddings and does similarity search — Pinecone, Milvus, Chroma, pgvector — the storage layer behind RAG.
- **Hugging Face**: "GitHub for AI," the biggest hub of open models and datasets, home to libraries like transformers.

### 4. Deploying and using

- **API**: the easy path — pay per token to call a cloud model, no infrastructure. *Like* tap water — turn it on, pay for what you use.
- **Self-hosting**: download an open model to your own machine — data stays local, no per-call fee, but it eats memory. *Like* digging your own well.
- **Ollama**: makes running open models locally simple — one command to download and run.
- **GGUF**: a common quantized model file format for local deployment, used with llama.cpp / Ollama.
- **VRAM**: the hard limit for local models. Rough rule: at 4-bit, params(B) × 0.6 ≈ VRAM needed (GB).

### 5. Generative media and evaluation

- **Diffusion models**: the mainstream tech for image/video generation — start from noise and "denoise" step by step.
- **Text-to-image**: Midjourney, Stable Diffusion (open), DALL·E, Google Imagen / Nano Banana.
- **Text-to-video**: OpenAI Sora, Google Veo, Kuaishou Kling, Runway.
- **TTS / ASR**: TTS is text-to-speech (synthesis); ASR is speech-to-text (recognition).
- **Benchmarks**: standardized tests of model ability — MMLU (general knowledge), SWE-bench (real bug-fixing), HumanEval (coding), GPQA (grad-level questions). Don't read scores alone; watch for benchmark gaming.

### 6. Case study: how Claude Code evolved

Anthropic's command-line AI coding agent, launched in 2025. It doesn't ship big V1/V2 versions — it **auto-updates continuously**, iterating by capability milestones:

- Start: a terminal CLI that reads/writes across files, runs commands, auto-commits.
- Editor integration: VS Code / JetBrains extensions with inline diffs and @-mentions.
- External connections: **MCP** to reach Jira, Slack, Google Drive, and more.
- Customization: **CLAUDE.md** memory, **Hooks** (run scripts before/after actions), **Skills** (packaged reusable workflows / slash commands).
- Multi-agent: subagents, agent teams, parallel background sessions, dynamic workflow orchestration.
- Everywhere: desktop app, web (claude.ai/code), mobile — one engine, shared config across surfaces.
- Automation: Routines (cloud scheduled tasks), GitHub Actions auto-review.

Arc: **terminal tool → multi-surface + ecosystem → an orchestratable agent platform**.


