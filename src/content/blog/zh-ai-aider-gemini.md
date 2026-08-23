---
title: '用 aider + Gemini 跑通第一个命令行 AI 编程助手'
description: '想要一个能自由换底层模型的命令行 AI 编程助手？用 aider 接 Gemini 免费额度跑通：uv 安装、拿 key、一行启动、切换 DeepSeek/OpenRouter/本地 Ollama，以及 key 怎么用得干净安全。'
pubDate: 'Aug 23 2026'
heroImage: '../../assets/blog-placeholder-5.jpg'
lang: 'zh'
category: 'ai'
module: 'usage'
submodule: 'tools'
---

想找个**能自由切换底层大模型**的命令行 AI 编程助手，试了 **aider**——开源、终端里跑、直接读写 git 仓库还自动 commit，最大的好处是底层模型随便换。这篇记一下我怎么用 **Gemini 的免费额度**把它跑通。

> 先跑通一个最省事的组合（aider + Gemini 免费额度），有手感了再去试 DeepSeek、OpenRouter、本地模型。别一上来纠结用哪个模型最好。

<div class="keypoint">
<div class="lbl">aider 是什么</div>
<p>一个命令行的 AI 结对编程工具：你用自然语言说需求，它读你的代码、跨文件改、还自动 git commit。它自己不绑模型——底层想接 Gemini、DeepSeek、还是本地模型，改个参数就行，<strong>模型完全由你选</strong>。</p>
</div>

<pre class="mermaid">
flowchart LR
  A["① 装 aider<br/>uv"] --> B["② 拿模型 key<br/>Gemini 免费额度"] --> C["③ 一行启动<br/>env KEY aider --model"] --> D["④ 换模型<br/>改 --model 即可"]
</pre>

## 一、为什么先选 aider + Gemini

- **aider**：开源、终端原生、自动 commit，且不锁模型——正好满足"想换着模型试"。
- **Gemini 免费额度**：Google AI Studio 给的 key 有慷慨免费额度，**零成本起步**，质量也够用。比一上来就充钱试要稳。

## 二、安装 aider

本机 Python 若是很新的版本（比如 3.14），直接 `pip install` 容易踩依赖和 PEP 668 的坑。用 **uv** 最省心，它会自动拉一个兼容的 Python，装进隔离环境，不污染系统：

```
uv tool install --python 3.12 aider-chat
```

验证：

```
aider --version
```

能出版本号就成。要卸载随时 `uv tool uninstall aider-chat`，干净利落。

## 三、拿 Gemini key（免费）

去 **Google AI Studio**（aistudio.google.com）→ "Get API key" → 新建一个，形如 `AIza...`，复制存好。免费额度就能用，注意有每分钟/每天的请求上限，偶尔限流等一下再试即可。

## 四、跑起来

到你的某个 git 项目目录，一行启动。**把 key 只临时带给 aider 这一个进程**，不写进 shell：

```fish
cd 你的项目

env GEMINI_API_KEY=你的key aider --model gemini/gemini-2.5-flash
```

- `gemini/` 这个前缀告诉 aider 走 Google 官方接口，**直连，没有中间商**。
- 想要更强的推理/写代码，把 flash 换成 `gemini/gemini-2.5-pro`（更耗额度、更易触限流）。
- 进去后直接中文说需求，比如"把 `utils.py` 里的日期解析改成支持时区"，它会改文件并自动 commit。

## 五、换别的模型：只改 `--model`

aider 底层是 litellm，几乎所有主流模型都能接，切换只需改模型名和对应 key：

| 想用 | 命令片段 | key 变量 |
|---|---|---|
| **DeepSeek**（便宜、代码强） | `--model deepseek/deepseek-chat` | `DEEPSEEK_API_KEY` |
| **OpenRouter**（一个 key 通吃百家） | `--model openrouter/deepseek/deepseek-chat` | `OPENROUTER_API_KEY` |
| **本地 Ollama**（免费离线） | `--model ollama/qwen2.5-coder:7b` | 无需 key（设 `OLLAMA_API_BASE`） |

具体版本号更新很快，以各家或 OpenRouter 当时列的为准。

## 六、进 aider 后的常用命令

| 命令 | 作用 |
|---|---|
| `/add 文件` | 把文件加进对话（让它能改） |
| `/drop 文件` | 移出对话 |
| `/ls` | 看当前在对话里的文件 |
| `/undo` | 撤销 aider 上一次改动（连 git commit 一起） |
| `/diff` | 看它刚改了什么 |
| `/model 名字` | 当场切换模型 |
| `/ask 问题` | 只讨论不改代码 |
| `/run 命令` | 跑个 shell 命令并把输出喂给它 |
| `/help` | 全部命令；Ctrl-D 或 `/exit` 退出 |

## 七、key 怎么用得干净安全

- **key 不入 shell**：用 `env KEY=... aider ...` 一行式，key 只活在那个进程里，命令结束即消失，不写进全局环境、不留痕。
- **隔离安装**：aider 由 uv 装在独立环境，不污染系统 Python，也和你机器上其他工具互不干扰。
- 写进项目 `.env` 时，**务必加进 `.gitignore`**，别把 key 提交上去。
- 想更彻底，**开个新终端标签页专门跑 aider**，物理隔离。

<div class="keypoint">
<div class="lbl">省事版：配置写进项目</div>
<p>不想每次敲 key，在项目目录建 <code>.env</code>（写 <code>GEMINI_API_KEY=...</code>）和 <code>.aider.conf.yml</code>（写 <code>model: gemini/gemini-2.5-flash</code>），之后直接 <code>aider</code>。记得把 <code>.env</code> 加进 <code>.gitignore</code>，别把 key 提交上去。</p>
</div>

## 结语

aider 最大的价值就是**把"用哪个模型"的选择权交回给你**：先拿 Gemini 免费额度跑通手感，再按需要换 DeepSeek（便宜）、OpenRouter（试各家）、或本地 Ollama（离线免费）。跑通一个，其余都是改个 `--model` 的事。想系统了解各类 AI 编程工具的定位，见 [AI 编程工具怎么选](/blog/zh-ai-tools/)。
