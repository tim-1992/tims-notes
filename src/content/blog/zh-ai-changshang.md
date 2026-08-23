---
title: 'AI 厂商与模型全景：谁家、什么模型、给谁用'
description: '一张图认全 AI 厂商与模型：OpenAI、Anthropic、Google 等主流玩家，旗舰/均衡/轻量的分档逻辑，开源与闭源格局，国内外阵营，配 DeepSeek 演变案例和选型建议。'
pubDate: 'Aug 23 2026'
heroImage: '../../assets/blog-placeholder-5.jpg'
lang: 'zh'
category: 'ai'
module: 'recognize'
submodule: 'vendors'
---

聊 AI 绕不开一堆公司和型号名：GPT、Claude、Gemini、DeepSeek……刚接触时容易被这些名字砸懵。这篇把主流厂商、它们的代表模型、分档逻辑，以及"谁开源谁闭源""国内国外"的格局理成一张全景，最后给一份选型建议。

> 型号更新极快，以下为大致格局，认准"厂商 + 分档逻辑"即可——**概念是稳定的，型号是流动的**。

<div class="keypoint">
<div class="lbl">怎么看这篇 · 三个问题</div>
<p>认一个模型，问清三件事就够：<strong>谁家的</strong>（哪个厂商、什么调性）、<strong>哪一档</strong>（旗舰最强 / 均衡够用 / 轻量最快）、<strong>能不能自己拿</strong>（闭源只能调 API，开源可下载部署）。名字会变，这三个维度不变。</p>
</div>

## 一、主流厂商与代表模型

先认玩家。每家都有自己的调性和主打方向。

- **OpenAI**：闭源标杆。当前 GPT-5.6 系列分 **Sol**（复杂专业任务）/ **Terra**（性价比均衡）/ **Luna**（低成本高并发）三档，另有安全向 Cyber、图像 GPT Image、实时语音等；历史上的 **o 系列**是主打推理的产品线。
- **Anthropic**：主打安全对齐、长文本、写代码。当前旗舰 **Claude Fable 5**（面向长时程 agent，最强），下面 **Opus 5**（复杂 agentic 编码/企业）、**Sonnet 5**（速度与智能最佳平衡）、**Haiku 4.5**（最快、接近前沿）三档。分档逻辑：Opus 最强、Sonnet 均衡、Haiku 最快。
- **Google**：多模态和超长上下文见长。**Gemini** 分 **Pro**（最强推理/编码）/ **Flash**（低延迟性价比）/ **Flash-Lite**（最便宜最快）/ **Nano**（端侧）；当前主力为 Gemini 3.x 与 2.5。配套 **Veo**（视频）、**Imagen / Nano Banana**（图像）。
- **Meta**：**Llama** 系列，开源阵营代表，催生大量社区衍生模型。
- **Mistral**：法国厂商，开源 + 商用并行，小而精。
- **DeepSeek（深度求索）**：国产，高性价比 + 强推理/代码出圈，开源影响力大（版本演变见下文）。
- **阿里 · 通义千问（Qwen）**：国产开源主力之一，模型矩阵全、社区活跃。
- **字节 · 豆包（Doubao）**：主打 C 端应用和低价 API。
- **月之暗面 · Kimi**：以超长上下文起家。
- **智谱 · GLM**：学术出身，模型与商用并重。
- **xAI · Grok**：马斯克旗下，深度绑定 X（推特）。

### 分档逻辑：几乎每家都是"三层塔"

认清一个规律，你就能秒懂任何一家的产品线——**旗舰 / 均衡 / 轻量**三档，几乎是行业统一套路：

- **旗舰档**（最强最贵最慢）：Claude Opus、Gemini Pro、GPT Sol。*用在*复杂推理、企业级 agent、硬骨头任务，不差钱、要效果。
- **均衡档**（最常用）：Claude Sonnet、GPT Terra、Gemini Flash。*用在*日常绝大多数场景，智能与速度、成本的甜点。
- **轻量档**（最快最便宜）：Claude Haiku、GPT Luna、Gemini Flash-Lite。*用在*高并发、简单分类/抽取、对延迟和成本敏感的量大活。

*好比*同一家车厂的高中低配：性能旗舰、走量主力、入门代步——发动机同源，按预算和需求挑档。

<div class="keypoint">
<div class="lbl">一句话记住分档</div>
<p><strong>旗舰</strong>：要最强、能烧钱 → Opus / Pro / Sol。<strong>均衡</strong>：日常首选、性价比 → Sonnet / Flash / Terra。<strong>轻量</strong>：量大、图快图省 → Haiku / Flash-Lite / Luna。选型先选档，再选厂。</p>
</div>

## 二、开源 vs 闭源：格局与取舍

这是分辨模型最关键的一刀。**权重公不公开**，决定了你能怎么用它。

- **闭源**（GPT、Claude、Gemini）：权重不公开，只能调 API。*优点*：通常最强、开箱即用、无需运维。*代价*：数据要出门（发给厂商）、按量付费、被厂商牵着走。
- **开源**（Llama、Qwen、DeepSeek、Mistral）：权重公开，可自己下载部署。*优点*：数据不出门、可私有化、可微调、长期成本可控。*代价*：要自己搞算力和运维，顶尖能力通常略逊闭源半步。

*好比*餐厅**只卖成品**（闭源，省事但受制于人）vs **直接给你菜谱**（开源，自由但得自己下厨）。

<pre class="mermaid">
flowchart TB
  Q([选模型]) --> A{数据能否出门 / 要不要私有化?}
  A -->|能出门 · 图省事| B[闭源 API<br/>GPT · Claude · Gemini]
  A -->|要私有 · 要可控| C[开源自部署<br/>Llama · Qwen · DeepSeek]
  B --> B1[按 token 付费 · 最强开箱即用]
  C --> C1[吃显存运维 · 可微调可控成本]
</pre>

## 三、国内 vs 国外阵营

- **国外**：OpenAI、Anthropic、Google 领跑闭源顶尖；Meta、Mistral 扛开源大旗。整体在最前沿能力上仍占身位。
- **国内**：DeepSeek、通义千问（阿里）、豆包（字节）、Kimi（月之暗面）、智谱 GLM 是主力。**高性价比 + 强开源**是国产的鲜明标签，DeepSeek 更是靠开源 + 低价打出全球影响力。中文场景、数据合规、预算敏感时，国产往往是更实的选择。

## 四、面向用户的 AI 应用/产品

上面是"发动机"（模型），这里是普通人直接用的"整车"（产品）。

- **ChatGPT**（OpenAI）：把 AI 带进大众视野的对话产品，如今集成搜索、画图、语音、Agent。
- **Claude**（Anthropic）：以写作、编码、长文档处理见长的对话产品。
- **Gemini App**（Google）：深度整合搜索与安卓/办公生态。
- **Perplexity**：主打"AI 搜索/答案引擎"，边搜边答、带来源引用，适合查资料。
- **Grok**（xAI）：集成在 X 里，实时性强、风格更"放"。
- **Poe**（Quora）：一个入口聚合调用多家模型。
- **NotebookLM**（Google）：把你上传的资料变成可问答、可生成播客的笔记本。
- **国内**：豆包、Kimi、通义、文心一言、腾讯元宝等。

## 五、案例：DeepSeek 模型演变

看一个真实模型怎么一代代进化，比记名字更有感觉。

- **V2.5**（2024-09）：合并原来的 Chat 与 Coder，通用 + 代码一体化。
- **V3**（2024-12）：`deepseek-chat` 大升级，671B MoE 架构，通用能力显著增强。
- **R1**（2025-01）：首个推理模型，支持"思考模式"，数学/代码大涨，凭开源 + 高性价比引爆全球关注。
- **V3.1**（2025-08）：混合架构，一个模型同时支持思考 / 非思考两种模式。
- **V3.1-Terminus**（2025-09）：修复中英文混杂，Code / Search Agent 增强。
- **V3.2**（2025-12，先出 Exp 实验版）：稳定版，思考与非思考模式分离。
- **V4-Flash**（2026-07）：公测，主打快，Agent 能力大幅提升。
- **V4-Pro**（2026-08）：正式版，Agent 性能巅峰，思考强度可调（low / high / max）。

主线：**通用（V2.5→V3）→ 推理（R1）→ 思考/非思考合一（V3.1→V3.2）→ 强 Agent（V4）**。

<pre class="mermaid">
flowchart LR
  A["通用<br/>V2.5 → V3"] --> B["推理<br/>R1"] --> C["思考 / 非思考合一<br/>V3.1 → V3.2"] --> D["强 Agent<br/>V4"]
</pre>

## 六、选型建议：什么场景选谁

- **日常对话、写作、通用问答**：均衡档就够——Claude Sonnet / GPT Terra / Gemini Flash，或国产豆包、Kimi。
- **写代码、复杂 agent、硬骨头**：上旗舰——Claude Opus / Fable、Gemini Pro、GPT Sol。
- **量大、简单任务、抠成本**：轻量档——Haiku / Flash-Lite / Luna，或国产低价 API。
- **超长文档、长上下文**：Gemini、Kimi、Claude 长文本能力突出。
- **数据要私有、要微调、长期控成本**：走开源自部署——DeepSeek、Qwen、Llama。
- **中文场景 + 预算敏感**：优先国产（DeepSeek、通义、豆包）。

> 别纠结"哪家最强"这种排行榜问题——**先定档次和开闭源，再在同档里挑一家顺手的**。型号每月都在变，选型逻辑能用很久。
