---
title: '数据采集：数据从哪来、用什么工具进数仓'
description: '数仓第一步——数据从哪来、用什么工具进来：埋点(GA4/Segment/神策)、日志(Fluentd/Vector)、数据集成(Airbyte/Fivetran/DataX)、CDC(Debezium/Canal/Flink CDC)、流式(Kafka/Flink)与调度(Airflow/Dagster)，附对比表与选型。'
pubDate: 'Aug 23 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
lang: 'zh'
category: 'warehouse'
module: 'collect'
---

数仓建得再漂亮，源头进来的数据是脏的、缺的、重的，后面全白搭。数据采集是整条链路的第一道关，也最容易被低估——它不难，但坑密集，工具也杂。这篇把"数据从哪来、用什么工具进来、会踩哪些坑"一次理清，工具都点名。

> 采集阶段的错，往往到下游做分析时才暴露，那时排查成本翻十倍。**在入口把账算清楚，比在出口擦屁股便宜得多。**

<div class="keypoint">
<div class="lbl">一句话抓手</div>
<p>采集先问三件事：<strong>数据从哪来</strong>（来源）、<strong>多久要一次</strong>（时效：实时还是 T+1）、<strong>怎么判断没漏没重</strong>（幂等与对账）。这三点定了，用哪类工具自然就出来了。</p>
</div>

## 一、数据从哪来：五类来源 + 代表工具

- **应用埋点（Event Tracking）**：App / 网页里埋的用户行为（点击、曝光、下单）。代表工具：**Google Analytics(GA4)**、**Segment**、**神策 Sensors**、**GrowingIO**、**友盟**，开源的 **PostHog**、**Snowplow**、**RudderStack**。质量取决于埋点规范，最容易漏埋、错埋。
- **服务端日志（Server Log）**：后端服务的请求/运行日志。采集靠 **Filebeat / Logstash**（ELK 栈）、**Fluentd / Fluent Bit**、**Vector**。比前端埋点可靠，但字段偏技术、要清洗。
- **第三方 API**：广告、支付、物流、电商平台（如 Shopify、各广告后台）等外部数据，靠定时拉取。多数用**数据集成工具**（见下）现成的 connector，省得自己写。
- **业务库同步（DB Sync）**：把 MySQL / Postgres 等生产库同步进数仓。最"干净"的结构化来源，但要小心别拖垮生产库——所以更推荐 CDC。
- **文件批量导入**：Excel、CSV、对方给的数据包。一次性、易出格式问题，脚本或数据集成工具的 file source 都能收。

## 二、用什么方式进来

### 1、批量 vs 流式

- **批量（Batch）**：按周期（每小时/每天）一批批搬。简单、稳、便宜，绝大多数数仓够用。
- **流式（Streaming）**：数据一产生就近实时进来。管道用 **Apache Kafka**、**Pulsar**、**AWS Kinesis**，处理用 **Flink** / **Spark Streaming**。时效高但复杂、贵——**别为了实时而实时**。

### 2、全量 vs 增量

- **全量**：每次整张表重搬，简单但数据一大就慢、贵。
- **增量**：只搬"上次之后变化的部分"，靠时间戳/自增 ID 圈范围，是大表常态；难点在边界（迟到、更新）。

### 3、CDC（变更数据捕获）

读数据库的 binlog / WAL，把增删改事件实时捕获出来。*好比*不再定期盘点整仓，而是盯着出入库单来一笔记一笔。适合"准实时同步业务库又不想压垮生产库"。

## 三、常用采集 / 集成工具一览

真正干活时，上面这些来源大多汇到几类工具里。分类摆一下：

**数据集成 / ELT（拉 API + 同步库，最常打交道的一类）**：

| 工具 | 类型 | 特点 |
|---|---|---|
| **Airbyte** | 开源 | connector 最多、社区活跃，自托管或云版 |
| **Fivetran** | 商业 | 全托管、省心、connector 稳，按用量收费偏贵 |
| **Stitch** | 商业 | 轻量、便宜，Singer 生态 |
| **阿里 DataX / DataWorks** | 开源 / 商业 | 国内常用，离线同步强 |
| **Meltano** | 开源 | 基于 Singer，工程化、可版本管理 |

**CDC（准实时同步业务库）**：

| 工具 | 说明 |
|---|---|
| **Debezium** | 开源标杆，基于 Kafka Connect，支持 MySQL/PG/Mongo 等 |
| **Canal**（阿里） | 专注 MySQL binlog，国内用得多 |
| **Flink CDC** | 和 Flink 流处理无缝，一体化 |
| **AWS DMS** | AWS 托管的库迁移/同步服务 |

**埋点 / 事件采集**：GA4、Segment、神策、PostHog（开源）、Snowplow（开源）。

**日志采集**：Fluentd / Fluent Bit、Vector、Filebeat。

**流式管道**：Kafka、Pulsar、Kinesis（+ Flink / Spark 处理）。

**调度编排（把采集任务串起来、定时跑、管依赖）**：**Airflow**、**Dagster**、**Prefect**、**DolphinScheduler**（国内）。这层不搬数据，但决定采集任务什么时候跑、失败怎么重试。

<pre class="mermaid">
flowchart LR
  S1["埋点 / 日志<br/>GA4 · Fluentd"] --> Q["缓冲<br/>Kafka / 对象存储"]
  S2["第三方 API<br/>Airbyte · Fivetran"] --> Q
  S3["业务库<br/>Debezium · Flink CDC"] --> Q
  Q --> R["落地<br/>bronze 原始层"]
  ORCH["调度: Airflow / Dagster"] -.编排.-> S2
</pre>

## 四、绕不开的几个坑

- **丢数据**：批任务失败没重跑、增量边界算错。对策：任务可重跑、监控每批条数。
- **重复**：重试或上游重发导致同一条进来两次。对策：**幂等**，按主键去重，别让下游背锅。
- **Schema 漂移**：上游偷偷加字段/改类型，任务哑火或错位。对策：schema 校验 + 变更告警，别默默吞掉。
- **时区**：源头是本地时间还是 UTC？混用会让"今天的数据"对不上。对策：入库统一时区并记录原始时区。
- **迟到数据（Late Arrival）**：昨天的数据今天才到（尤其第三方 API）。对策：增量窗口留回看余量（如按 [D-2, D] 而非只取 D）。

<div class="keypoint">
<div class="lbl">选型速记</div>
<p>结构化、要准 → <strong>业务库同步（Airbyte/Fivetran）</strong>；要准实时又不压垮生产库 → <strong>CDC（Debezium/Flink CDC）</strong>；行为分析 → <strong>埋点（GA4/Segment）+ 服务端日志</strong>；外部数据 → <strong>集成工具的 API connector 定时拉</strong>；一次性 → <strong>文件导入</strong>。时效上：<strong>能 batch 就别 streaming，能增量就别全量。</strong></p>
</div>

## 结语

采集这步的手艺，不在用了多花哨的工具，而在**把"没漏、没重、没错位"做扎实**——工具只是帮你少写胶水代码。源头稳了，数仓后面每一层才站得住。数据进来之后怎么清洗、怎么分层，见 [数据清洗的三个隐形坑](/blog/zh-shuju-qingxi/) 和 [数仓为什么要分层](/blog/zh-shucang-fenceng/)。
