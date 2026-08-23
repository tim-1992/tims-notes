---
title: 'AI 开发框架与生态：LangChain、向量库与 Hugging Face'
description: '搭 AI 应用要不要上框架？LangChain / LlamaIndex / LangGraph 怎么选，向量数据库怎么挑，Hugging Face 能白嫖什么——一篇讲清 AI 工程的地基。'
pubDate: 'Aug 23 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
lang: 'zh'
category: 'ai'
module: 'engineering'
submodule: 'framework'
---

会调 API 之后，真要把一个像样的 AI 应用搭起来，就得面对一堆框架和基础设施的名字：LangChain、向量库、Hugging Face……它们不是模型，而是把模型、数据、工具"拼装成应用"的地基。这篇讲清各自干什么、怎么选，以及一个绕不开的问题——**到底要不要上框架**。

> 框架是脚手架，不是必需品。需求简单时，一段自己写的代码往往比硬套框架更清爽。

<div class="keypoint">
<div class="lbl">先想清楚 · 要不要框架</div>
<p>只是"调一次模型、拿个结果"——<strong>直接调 API</strong> 就好，别引框架。当你开始需要<strong>把多步串起来</strong>（检索 → 拼 prompt → 调模型 → 调工具 → 再来一轮）、要<strong>管记忆和状态</strong>、要<strong>接一堆数据源</strong>时，框架才开始省事。先有痛点，再上框架。</p>
</div>

## 一、开发框架

### 1、LangChain

最流行的 LLM 应用开发框架之一，把 prompt、模型、工具、记忆、检索串成一条条"链（chain）"。*好比*搭 AI 应用的乐高积木——每块（模型、检索器、工具）都是标准接口，拼起来就是一条流程。

- *适合*：想快速把"检索 + 调模型 + 调工具"这类多步流程搭起来。
- *代价*：抽象层多，简单需求硬套反而绕；版本迭代快，早期以"改动大"出名。

### 2、LlamaIndex

偏**数据接入和检索**的框架，专注把你的私有数据（文档、数据库、API）喂给模型，是做 RAG 时的常用选择。*好比*给模型配了个专业的资料管理员——切分、索引、检索这套活它最拿手。

- *和 LangChain 的区别*：LangChain 什么都想串，偏"流程编排"；LlamaIndex 更聚焦"数据 → 检索"这一段，做 RAG 时往往更顺手。两者也能配合用。

### 3、LangGraph

LangChain 的进阶库，用**图结构**编排更复杂、可循环、可回退的 Agent 流程。*好比*从"直线流水线"升级成"带岔路和回环的流程图"——适合 agent 要反复试错、根据结果决定下一步的场景。

<pre class="mermaid">
flowchart LR
  A[需求简单<br/>一步出结果] --> API[直接调 API]
  B[多步 / 要检索<br/>要记忆] --> LC[LangChain / LlamaIndex]
  C[复杂 Agent<br/>要循环回退] --> LG[LangGraph]
</pre>

<div class="keypoint">
<div class="lbl">一句话选型</div>
<p>只调模型 → <strong>裸 API</strong>；喂私有数据做问答 → <strong>LlamaIndex</strong>；多步流程编排 → <strong>LangChain</strong>；复杂可循环的 Agent → <strong>LangGraph</strong>。不确定就从最轻的开始，痛了再往上加。</p>
</div>

## 二、向量数据库（Vector DB）

专门存 embedding 向量、做相似度检索的数据库，是 RAG 的**存储底座**——把资料变成向量后就存这儿，检索时按"语义接近"捞回来。

常见几款，按场景挑：

- **pgvector**：给 PostgreSQL 加向量能力的插件。*适合*本来就用 Postgres、数据量不大、不想多引一套系统——省事、够用。
- **Chroma**：轻量、开箱即用，本地跑或小项目原型首选。*适合*快速验证、Demo。
- **Milvus**：为大规模向量检索设计，性能和扩展性强。*适合*数据量大、要上生产、追求检索性能。
- **Pinecone**：托管服务（SaaS），不用自己运维，按用量付费。*适合*不想管基础设施、想快速上线。

<div class="keypoint">
<div class="lbl">怎么挑向量库</div>
<p>已有 Postgres 且量不大 → <strong>pgvector</strong>；本地原型 → <strong>Chroma</strong>；大规模自建 → <strong>Milvus</strong>；懒得运维、要托管 → <strong>Pinecone</strong>。别一上来就上重型，先跑通再谈规模。</p>
</div>

## 三、Hugging Face：AI 界的 GitHub

开源模型和数据集最大的集散地，也是整个开源 AI 生态的中心。在上面你能白嫖到一整套家当：

- **模型（Models）**：几十万个开源模型，从 LLM 到语音、图像，下载即用。
- **数据集（Datasets）**：现成的训练/评测数据集。
- **transformers 库**：几行代码就能加载并跑一个模型，是用开源模型的事实标准库。
- **Spaces**：托管 Demo 的地方，很多模型有现成的网页版可直接试。
- **推理 API / Endpoints**：想省事的话，不下载也能直接调云端托管的开源模型。

*好比*一个"AI 界的 GitHub + 应用商店"——找模型、拿数据、跑 Demo、抄别人的实现，都在这一站。

> 用开源模型这条路，几乎都绕不开 Hugging Face：先在这儿找模型，再决定是本地部署还是走托管。
