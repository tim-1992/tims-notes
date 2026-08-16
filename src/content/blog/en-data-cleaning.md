---
title: 'Three Hidden Traps in Data Cleaning'
description: 'Nulls, time zones, and duplicate keys — the dirty-data issues most often missed in production ETL.'
pubDate: 'Aug 10 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
lang: 'en'
category: 'warehouse'
sub: 'process'
---

I've been learning data cleaning lately, and it turns out what actually breaks reports is rarely complex logic — it's a few unassuming dirty-data problems. Jotting down the three I've hit.

## 1. A null is not always NULL

"Empty" comes in many flavors: `NULL`, empty string `''`, the literal `'null'`, even `'N/A'`. If you only filter `WHERE col IS NOT NULL`, the rest still pollute downstream.

## 2. Time zones

Half your event timestamps are UTC, half are local. Aggregate them by day and cross-midnight rows drift. Store everything as UTC, convert at the presentation layer — never mix in between.

## 3. Duplicate primary keys

Upstream reruns, backfills, and double delivery all create duplicate keys. Never assume a key is unique; deduping with a window function before you land the table is table stakes.

> In short: dirty data doesn't throw errors — it just quietly makes your numbers wrong.
