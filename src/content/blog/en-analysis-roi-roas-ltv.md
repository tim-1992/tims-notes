---
title: 'ROI, ROAS, and LTV: Which Money Metric Should You Actually Trust?'
description: "Why is the platform's reported ROAS always higher than yours? Should ROI use revenue or gross profit? Is LTV computed or guessed? A deep dive into the three most misread money metrics: breakeven lines, marginal thinking, the three generations of LTV math, and when each metric lies to you."
pubDate: 'Aug 31 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
lang: 'en'
category: 'analysis'
module: 'metrics'
---

A scene from every ad-review meeting: the platform dashboard shows ROAS of 8, finance says ads lost money this quarter, and the growth lead says "by LTV we're actually profitable." All three are talking about "is our advertising worth it" — with three different metrics and three different definitions. Nobody is wrong, yet nothing adds up.

This post is not about warehouse implementation. It dissects the three metrics themselves from an analyst's view: where each one's definition traps hide, when to trust it, and when it lies to you.

> Running example: an e-commerce store with a $200 average order value and 40% gross margin spends $100k on ads this month. The ad platform reports $600k in attributed revenue; the in-house warehouse, using last-click attribution, says $400k.

## 1. ROAS: the most used, and the best liar

**ROAS = attributed revenue ÷ ad spend.** The platform says 6; in-house says 4. Which is right?

### Trap 1: platform-reported ROAS is inflated by design

Every ad platform only sees its own touchpoints, and every one of them **leans toward claiming credit**:

- View-through attribution: a user sees your ad, doesn't click, buys later on their own — the platform counts it;
- Long default attribution windows (7-day click / 1-day view is common) — the longer the window, the more revenue gets pulled in;
- When you run multiple platforms, the same order can be claimed by Meta **and** Google. Add up each platform's attributed revenue and it routinely exceeds your actual total revenue.

Platform ROAS is fine for **comparisons inside one platform** (this campaign vs. that campaign). It cannot answer "how much money did this channel really bring in." For cross-channel comparison you need one consistent in-house attribution — in our example, 4 is closer to the truth than 6.

### Trap 2: high ROAS ≠ profit — you need the breakeven line

ROAS is meaningless without a passing grade. The grade is:

**Breakeven ROAS = 1 ÷ gross margin**

At 40% margin, breakeven ROAS = 1/0.4 = **2.5**: every ad dollar must return at least $2.50 in revenue just for gross profit to cover the ad cost.

- In-house ROAS of 4 > 2.5 → genuinely profitable;
- In a 15%-margin business (consumer electronics, say), breakeven is 6.7 — the same ROAS of 4 means **losing money on every order**.

That's why "what's a good ROAS" has no universal answer. Without the margin, ROAS is a decorative number.

### Trap 3: blended ROAS and channel ROAS answer different questions

- **Channel ROAS**: channel-attributed revenue ÷ channel spend — measures single-channel efficiency, at the mercy of your attribution model;
- **Blended ROAS (a.k.a. MER)**: **total site revenue ÷ total ad spend** — no attribution involved; the numerator is real money.

Blended's superpower is that **attribution can't fool it**. Mature teams use blended ROAS to judge overall health and channel ROAS for in-channel optimization. Teams that only watch channel ROAS get ambushed by "every channel claims it's profitable": each channel shows ROAS above 3, yet the company loses money overall, because revenue was double-counted across channels.

### Trap 4: ROAS measures attribution, not incrementality

The sneakiest one. Brand-keyword search ads post ROAS of 20+ year-round — looks like a money printer. But people searching your brand name **were already coming to buy**. Without the ad, most of those orders happen anyway; the ad merely intercepts conversions that were already in motion, and attribution hands it full credit.

The real question is **incrementality**: "how many extra orders happen if we run this vs. not?" The rigorous answer needs geo experiments or holdout tests. For everyday analysis, one rule of thumb goes a long way: **the closer a touchpoint sits to checkout (brand search, retargeting), the more inflated its ROAS; the further upstream (prospecting, content), the more underrated.** Cut budget by sorting on ROAS and you'll usually kill your most incremental acquisition channels first.

## 2. ROI: both the numerator and denominator have fine print

**ROI = (attributed gross profit − ad spend) ÷ ad spend.** Our example: $400k revenue × 40% margin = $160k gross profit, ROI = (160 − 100) ÷ 100 = **60%**.

### Numerator: use gross profit — and make it *real* gross profit

Computing ROI with revenue is the most common mistake (what you get is actually ROAS − 1). And "gross profit" itself has shallow and deep versions:

- **Shallow**: revenue − cost of goods;
- **Real**: also subtract shipping, payment fees, refunds and returns, coupon discounts.

Return rates of 10–20% are normal in e-commerce, and coupons eat a few more points. Channels that are ROI-positive on the shallow definition and negative on the real one are everywhere. At minimum, subtract **refunds** — that's the biggest chunk of water in the number.

### Denominator: do people and tools count?

Beyond media spend — do team salaries, agency fees, and creative production costs go in the denominator? There's no standard answer, but there is a standard practice: **narrow scope (media spend only) for day-to-day channel optimization, full scope for annual budget decisions.** What matters is that one report uses one scope, stated explicitly. "ROI 60%" without its definition attached is unusable.

### Average ROI hides marginal ROI

A channel runs 60% ROI overall — add budget? The average says yes, but **extra budget earns the marginal ROI, not the average**.

Ad buying has natural diminishing returns: the cheap conversions get bought first, and each added dollar buys pricier ones. Scaling a channel from $100k to $150k, the extra $50k might return 10% ROI or worse. So the right budgeting question isn't "what's this channel's ROI" but "**how much ROI is left on the next $10k**." In practice: plot the channel's historical spend-vs-conversions scatter and see where the curve bends — the flatter it gets, the closer you are to the ceiling.

## 3. LTV: from computing history to guessing the future

**LTV = total gross profit a customer contributes over their entire lifetime.** Two key words: **gross profit** (not revenue), and **entire** (not just the first order).

### Why you can't skip it: CAC can only be compared to LTV

Customer acquisition cost: CAC = spend ÷ new customers. In our example, $400k revenue means 2,000 orders; say 600 came from new customers: CAC = $100k ÷ 600 ≈ **$167**. First-order gross profit is only $200 × 40% = $80 — **a net loss of $87 per new customer on the first order**.

By first-order math, kill the channel. But if customers repurchase ~4 times and contribute $320 total gross profit, LTV : CAC ≈ 1.9 — not losing money, though not healthy yet either. That's LTV's job: **it is the only legitimate thing to compare CAC against.** Reference lines:

- LTV : CAC < 1: every acquisition is a net loss;
- ≈ 3: the commonly cited healthy zone;
- \> 5: possibly too conservative — leaving growth on the table.

Pair it with the **payback period**: how long repeat purchases take to earn CAC back. A gorgeous ratio with an 18-month payback can still kill your cash flow — for businesses running on investor money, payback is often more lethal than the ratio.

### Three generations of LTV math, each with its own trap

**Gen 1: historical average.** Total historical gross profit ÷ customer count. Simplest, with a structural bug: veteran customers are fully counted while new customers — whose lifetimes have barely started — drag the average down (**systematic underestimate**). Count only "still-active" customers instead and you've built survivorship bias (**systematic overestimate**).

**Gen 2: cohort curve extrapolation.** Group customers by acquisition month, plot each cohort's cumulative gross profit curve, and extrapolate young cohorts using the completed curves of old ones. Best value-for-effort for analysts — no modeling required, one cohort table does it, and you get an early-warning signal for free ("are new cohorts' curves flattening vs. old ones?" — acquisition quality decaying).

**Gen 3: predictive models.** Probabilistic models like BG/NBD and Gamma-Gamma (Python's `lifetimes` library works out of the box) or ML, predicting value per individual customer. Enables "estimate LTV 30 days after signup" for real-time bid adjustment. The cost: poor explainability and high maintenance — and without the first two generations as a sanity check, jumping straight to Gen 3 is self-deception.

### The three classic LTV crashes

1. **Using revenue as LTV**: revenue-based LTV of $800 vs. CAC $200 looks like a healthy 4:1; switch to gross profit ($320) and it collapses to 1.6:1. Whatever you compare against CAC must be profit-based.
2. **Making every decision on average LTV**: LTV distributions are heavily right-skewed — the top 20% of customers often contribute 60%+ of value. A channel with average LTV of $360 might have a median of $120. Slicing the distribution by channel and source beats any single mean.
3. **Assuming LTV is static**: last year's LTV is not this year's new customers' LTV. Scaling spend usually pulls in lower-quality audiences (the easy customers get acquired first — same logic as marginal ROI), so recompute LTV by rolling cohort.

## 4. Which metric answers which decision

| Decision | Look at | Why |
|---|---|---|
| Shifting budget between campaigns within a platform | Channel ROAS | Valid for relative comparison under one definition; don't trust the absolute value |
| Is this channel actually profitable? | ROI (real gross-profit basis) | ROAS carries no costs; it can't answer this |
| Is company-wide ad spend healthy? | Blended ROAS / MER + total ROI | Immune to attribution distortion |
| Kill a channel that loses money on first orders? | LTV : CAC + payback period | First-order ROI wrongly executes high-repeat channels |
| How far to scale a channel's budget | Marginal ROI | A pretty average doesn't mean the next dollar earns |
| Are brand search / retargeting worth it? | Incrementality tests | Attribution metrics are systematically distorted here |

## Tying it together

The three metrics are one question projected onto three time scales: **ROAS shows what this spend returns in revenue right now (fastest, crudest); ROI shows whether you actually earned after costs (slower, truer); LTV shows what this batch of customers is worth long-term (slowest, most complete).** Use the fast metrics for daily tuning and the slow ones to calibrate the fast: ROI calibrates "how high must ROAS be to pass," LTV calibrates "how much first-order loss is tolerable." Fast metrics alone optimize your business into a ditch; slow metrics alone arrive after the decision mattered. Read all three layers together and you've actually answered "is our advertising worth it."
