---
title: 'Why Warehouses Have Layers: bronze / silver / gold'
description: 'What each layer is for, what belongs in it, and what does not.'
pubDate: 'Aug 13 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
lang: 'en'
category: 'warehouse'
sub: 'model'
---

I used to wonder: why not compute reports straight from raw data in one step? Turns out it's about **maintainability**. Layering trades storage for lower maintenance cost.

## bronze: raw layer

Land upstream data as-is, with minimal processing. Its job is to keep an original copy so you can trace problems back.

## silver: cleaned layer

Dedupe, fill nulls, unify definitions, flatten structure. Every downstream transform reads from here, guaranteeing consistent definitions.

## gold: application layer

Business-facing wide tables and metric tables, fed directly to reports and dashboards.

The payoff: change a definition in one place (silver) and all of gold benefits; debug by walking up the layers. Don't fear storing an extra copy — the debugging time it saves dwarfs the storage cost.
