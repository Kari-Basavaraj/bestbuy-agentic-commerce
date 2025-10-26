# Agentic Commerce PRD – Best Buy (Draft v0.1)
**Date:** Oct 25, 2025  
**Audience:** Best Buy Digital / Product / Geek Squad / CX / Health leadership

---

## 1. Vision

### Current State
- BestBuy.com and the Best Buy app already let customers talk to human experts via chat/video (“Shop with an Expert”) from a virtual store staffed by trained Blue Shirts, even if the shopper is browsing from home. citeturn0search2turn0search5turn0search8
- Best Buy is deploying generative AI assistants with Google Cloud and Accenture to support both customers and frontline associates, so they can troubleshoot, reschedule deliveries, manage memberships, and surface product guidance faster. citeturn0search0turn0search3turn0search9turn0search13
- Best Buy is rolling out immersive spatial shopping (“Best Buy Envision”), where customers wearing Apple Vision Pro can preview TVs, appliances, furniture, and more directly in their physical space before buying. citeturn0search10turn0search18turn0news39
- My Best Buy Plus™ / My Best Buy Total™ memberships bundle perks like exclusive pricing, extended returns, and 24/7/365 Geek Squad tech support and protection (including AppleCare+), creating ongoing relationships beyond a single purchase. citeturn0search1turn0search4turn0search15turn0news38

### Strategic Leap
- Move from “guided shopping” → **agentic commerce**.
- Agentic commerce = every customer gets their own persistent AI + human-backed buying/ownership agent that:
  - Understands their context (budget, household, devices they already own, caregiving needs).
  - Designs the total solution (products + services + install + membership), not just a SKU list.
  - Executes the logistics end-to-end (financing, pickup/delivery, Geek Squad install, recycle old gear).
  - Stays with them after purchase (support, warranty, upgrades, trade-in, aging-at-home safety).

### North Star
> “I don’t shop for tech. Best Buy’s agent outfits my life, maintains it, and upgrades it when it’s time.”

### Why Best Buy can win
- Best Buy already operates the missing pieces competitors can’t copy easily:
  - Human experts on demand (Blue Shirts + Virtual Store). citeturn0search2turn0search5turn0search8
  - National field service (Geek Squad, in-home install, 24/7 support). citeturn0search1turn0search7
  - Membership economics with protection bundled (My Best Buy Total). citeturn0search1turn0search4turn0search15turn0news38
  - Aging-at-home remote monitoring capability via Best Buy Health, to help families keep seniors safe at home — a category with high emotional value and recurring revenue.
- Best Buy is already publicly investing in generative AI + associate enablement, not just cost cutting. This mirrors what Verizon reported: arming human reps with AI assistants increased sales ~40%, by freeing them from lookup work and letting them focus on advising and attachment. citeturn0search0turn0search3turn0search6turn0news37

---

## 2. Product Goal & Success KPIs

### Goals
- Shift BestBuy.com from “catalog + cart” to “Concierge + outcome.”
- Drive higher conversion in high-anxiety, high-ticket categories (TV/home theater, laptops, appliances, smart home, senior safety).
- Increase attachment of:
  - Membership tiers (My Best Buy Plus / Total),
  - Geek Squad installation and setup,
  - Protection and AppleCare+,
  - Trade-in / recycle / haul-away services.
- Reduce burden on call centers by resolving routine support, delivery changes, returns, and protection questions through an AI concierge that can also hand off to a human with full context. citeturn0search0turn0search3turn0search9turn0search13

### KPIs
- % of carts initiated via Agent vs. traditional browse.
- Bundle attach rate (device + install + protection + membership).
- Avg. time from “I have a need” → “Install scheduled.”
- Tier upgrade rate to My Best Buy Total™ during checkout flow. citeturn0search4turn0search15turn0news38
- Post-install NPS / CSAT.
- Handle time reduction in support + % resolved without human, while maintaining escalation satisfaction.

---

## 3. Experience Pillars

1. **Personal Tech Concierge (“My Tech Pro”)**
   - A persistent agent that knows your household tech stack, warranties, expiring protection, home setup, and even caregiving needs (if you opt in).
   - Available in web header, mobile app home tab, phone IVR, in-store kiosks, and associate tablets.
   - Tone: patient, budget-aware, transparent.

2. **Solutions > SKUs**
   - Instead of “Here are 42 laptops,” the agent returns 1–2 curated ‘total setups’: the device, data transfer, protection, and same-day pickup/install.
   - This matches Best Buy’s stated direction for AI-powered search that aims to interpret true intent and reduce overwhelming choice. citeturn0search0turn0search3turn0search9turn0search13

3. **Omnichannel Fulfillment as a Feature**
   - Every recommendation includes pickup timing, same-day delivery, Geek Squad install windows, and haul-away/recycling.
   - This leverages Best Buy’s ship-from-store, curbside pickup, and national service footprint. citeturn0search2turn0search5turn0search8

4. **Lifecycle Care**
   - Agent proactively flags: expiring AppleCare+, slowing laptop thermals, senior fall risk sensor offline, Wi‑Fi dead spots before a 4K streaming night.
   - Hooks into 24/7 Geek Squad support and My Best Buy Total membership promises. citeturn0search1turn0search4turn0search7turn0search15turn0news38

5. **Human Backup On Demand**
   - One tap to escalate to a real Blue Shirt or Geek Squad associate through live chat/video.
   - This is an extension of the existing “Shop with an Expert / Virtual Store” experience, which already connects shoppers directly to associates on video. citeturn0search2turn0search5turn0search8

---

## 4. Priority User Segments

- **Upgrade Shopper**
  - “My 2019 laptop is slow. I edit 4K video. I need a new machine tonight and data moved.”
  - Agent responds with: 2 Copilot+/AI laptops in stock nearby, migration service, AppleCare+ / protection, and install tonight 7–9pm.

- **Life Moment Shopper**
  - “I’m redoing my living room theater / renovating kitchen / setting up work-from-home.”
  - Agent builds a full room bundle in AR using Best Buy Envision, schedules install, and handles haul-away of old gear. citeturn0search10turn0search18turn0news39

- **Caregiver / Aging at Home**
  - “I need fall detection and remote alerts for my dad, I live 2 hours away.”
  - Agent proposes a preconfigured safety kit + professional in-home setup, mapped to Best Buy Health’s remote monitoring capability for seniors aging in place.

- **Membership Customer**
  - “I already pay you yearly. Keep all my tech healthy and protected, just tell me when it’s time to upgrade.”
  - Agent uses My Best Buy Total™ data to surface entitlement (“You already get 24/7/365 Geek Squad support and AppleCare+, want me to schedule a tune-up?”). citeturn0search1turn0search4turn0search7turn0search15turn0news38

---

## 5. Feature Set & Specs

### 5.1 My Tech Pro (Agent Dashboard)
**What it is**
- A persistent assistant surface shown after sign-in (“Hi, I can upgrade your laptop and set it up tonight for video editing under $1,000.”).
- Lives in site header, app home tab, and support chat.

**Key Capabilities**
- Need Understanding  
  - Asks 2–3 clarifying questions (budget, use case, urgency).
- Bundle Recommendation  
  - Returns 1–2 total solutions (hardware + services + membership upsell).
- Logistics Execution  
  - Adds bundle to cart, books Geek Squad installation/repair, schedules delivery or pickup, arranges recycling/haul-away.
- Human Handoff  
  - “Talk to a Blue Shirt live now” via chat/video with context transfer.

**Spec**
- Output style: cards, not paragraphs.
- Each card shows:
  - Total monthly / total upfront cost.
  - Protection & support coverage.
  - Pickup/delivery/install windows.
  - “Why this pick” in plain English.

---

### 5.2 Guided Room / Home Planner
**What it is**
- Spatial planner for home theater, kitchen appliances, home office, security, or senior safety.
- Runs in:
  - Web (2D guided layout),
  - In-store kiosks,
  - Apple Vision Pro via Best Buy Envision (already live as a Vision Pro AR app that previews 3D models of TVs, appliances, furniture, etc. in your real space). citeturn0search10turn0search18turn0news39

**Key Capabilities**
- Capture rough room dimensions.
- Place products virtually (TV size, fridge clearance, speaker positions, fall sensors).
- Auto-generate a “Full Install Kit” (mounts, cables, surge protectors, sensors, smart hubs).
- One-tap “Schedule Geek Squad install + haul-away old gear.”

---

### 5.3 Aging-at-Home Safety Pack
**What it is**
- Curated caregiving bundle: fall detection, emergency contact hub, basic vitals / activity alerts, caregiver mobile dashboard.
- Uses Best Buy Health’s existing remote monitoring model for seniors living independently, extended to consumer channels.

**Key Capabilities**
- Intake flow: mobility level, chronic conditions, caregiver distance, Wi‑Fi reliability.
- Auto-recommends devices + installation service.
- Caregiver view: alerts, escalation logic (“Call me if inactivity >4 hrs”).

**Spec**
- Must be opt-in, with explicit consent and data transparency for health/safety info.

---

### 5.4 Conversational Support / Returns / Reschedule
**What it is**
- Natural-language aftercare: “This TV came late,” “I want to extend protection,” “I need to swap size,” “Reschedule my fridge install.”
- Built on the AI customer support assistant Best Buy is already co-developing with Google Cloud and Accenture, planned to show up in web, app, and phone channels. citeturn0search0turn0search3turn0search9turn0search13

**Key Capabilities**
- Policy-aware answer: Am I in return window? Any restocking fee?
- Offer upgrade instead of refund if margin-positive.
- Book pickup / new delivery slot instantly.
- Escalate edge cases to human with full context.

---

### 5.5 Membership Autopilot
**What it is**
- Inline membership ROI calculator.
- Surfaces the math: “If you upgrade to My Best Buy Total™ ($179.99/yr), you get 24/7 Geek Squad support for all tech you own, AppleCare+ coverage, and 20% off repairs. That’s cheaper than buying those separately.” citeturn0search1turn0search4turn0search15turn0news38

**Key Capabilities**
- Real-time comparison of:
  - Current cart + protection + install fees
  - vs.
  - Same cart under Plus / Total membership.
- One-tap “Add membership + apply benefits to this cart.”

---

### 5.6 Creator / Influencer Setups
**What it is**
- Shoppable, agent-generated bundles like “Pro Gaming Battlestation Under $2K” or “Accessible Smart Home for Aging Parents,” curated by creators or Best Buy experts.
- Best Buy already spotlights associates/experts in marketing, and ties in-store experiences to narrative selling (Blue Shirts pitching multi-product solutions). citeturn0search16

**Key Capabilities**
- Auto-syncs live pricing and inventory.
- “Match this setup to my budget / my room size,” triggering the agent to intelligently down-spec or up-spec.
- Attribution hooks into Best Buy Ads for brand-funded visibility.

---

## 6. UX / UI Plan

### 6.1 Core UI Surfaces
- **Agent Entry Point**
  - “My Tech Pro” pill in global header (desktop) / bottom tab (app).
  - Opens a right-side drawer (web) or full-screen panel (app).

- **Solution Card**
  - Side-by-side comparison of 2 bundles:
    - “Creator Video Edit Setup (Good)”
    - “Creator Video Edit Setup (Pro)”
  - Each bundle shows:
    - Hardware list
    - Data migration / setup service
    - Protection & membership coverage
    - Pickup / delivery / install slots

- **Fulfillment Strip**
  - Horizontal chips under each bundle:
    - “Pickup today 1 hr @ [nearest store]”
    - “Deliver tonight 7–9pm”
    - “Geek Squad install tomorrow 8–10am”
    - “Recycle old TV ✔”
  - Makes logistics a selling point, not an afterthought.

- **Escalate to Human**
  - Always-visible CTA:
    - “Talk to a Blue Shirt now (video)” → launches live associate, a flow Best Buy already runs in its Virtual Store. citeturn0search2turn0search5turn0search8

### 6.2 Tone & Content
- Conversational, pragmatic, price-aware.
- Avoid spec-dump (“3.2GHz 12-core”) unless asked; lean on outcome (“smooth 4K editing without stutter”).
- Upfront about total cost of ownership (device + install + protection + membership).

### 6.3 Accessibility & Trust
- WCAG AA+ color contrast, large tap targets, voice input option.
- Clear privacy badges:
  - “Your room scan stays with Best Buy, used only to plan install.”
  - “Health alerts are shared only with approved caregiver.”
- Clear AI disclosure: “You’re chatting with AI. Want a human?” to reinforce agency and trust.

---

## 7. Technical Architecture (High Level)

### 7.1 Core Services
- **Customer Context Graph**
  - Unified profile: purchase history, registered devices + warranties, install/repair history, membership tier, and — if approved — home layout + aging-at-home safety profile.
  - Exposed through an internal privacy-gated API.

- **Agent Orchestration Layer**
  - LLM-driven reasoning and planning service.
  - Skills (“tools”):
    - Need clarification
    - Bundle assembly (hardware + service + membership)
    - Policy reasoning (returns windows, install rules)
    - Fulfillment orchestration (inventory, pickup window, Geek Squad schedule)
  - Mirrors the AI assistant initiative Best Buy, Google Cloud, and Accenture are already publicly building for customers and associates. citeturn0search0turn0search3turn0search9turn0search13

- **Inventory / Fulfillment API**
  - Real-time store-level stock, curbside pickup readiness, delivery slots, Geek Squad availability, haul-away capacity.

- **Human Handoff Service**
  - Session context is passed to a live associate (video/chat).
  - Associate sees what the agent already collected (budget, room, needs).
  - Extends existing Virtual Store / Shop with an Expert model. citeturn0search2turn0search5turn0search8

- **Compliance & Privacy Layer**
  - Consent tracking for:
    - Room scans / home layout
    - Aging-at-home safety data
  - Right-to-delete UI.

### 7.2 Data & AI Governance
- Force the agent to present at least one cost-conscious path and explain trade-offs.
- CEO commentary and analyst coverage highlight Best Buy’s focus on helping customers navigate affordability and tech complexity responsibly — not just upsell. (Inference based on Best Buy’s public positioning around using AI to “unlock the power of people,” not replace them, and to make technology more approachable. citeturn0search0turn0search3turn0search6turn0news37)

- Safety for aging-at-home:
  - The system cannot auto-share health/safety alerts with anyone except explicitly authorized caregivers.

---

## 8. Rollout Plan

**Phase 0 – Service Concierge (Support-first)**
- Inject “My Tech Pro” into support and order management flows first:
  - “Reschedule delivery,” “Return this fridge,” “Extend protection,” “Troubleshoot Wi‑Fi.”
- This aligns with the already-announced gen AI virtual assistant coming to BestBuy.com, the app, and the phone channel for troubleshooting, order management, and membership support. citeturn0search0turn0search3turn0search9turn0search13
- Benefit: immediate handle-time reduction and higher CSAT, lower legal risk than proactive product recommendations.

**Phase 1 – High-Value Bundles (Laptops & TVs)**
- Add bundle-style agent recs into two top consideration categories (content creation laptops, home theater TVs / soundbars).
- Bundles always include:
  - Device
  - Setup / migration service
  - Protection / AppleCare+
  - Membership upgrade
  - Install / pickup plan

**Phase 2 – Room Planner + Install Scheduler**
- Launch spatial/AR “design my home theater / kitchen / WFH setup.”
- Tie directly into 1-click Geek Squad scheduling + haul-away.
- Uses and extends Best Buy Envision app (Vision Pro AR preview of products in your space). citeturn0search10turn0search18turn0news39

**Phase 3 – Aging-at-Home Safety Pack**
- “Help my dad live independently but safely.”
- Bundle remote monitoring hardware, alert routing, caregiver dashboard, and in-home install.
- Positions Best Buy as not just a retailer, but a household safety partner.

---

## 9. Vibecoding Plan (Design–Engineering Co-Creation)

We’ll ship faster by letting design/PM teams author behavior, tone, and UI blocks in editable specs that engineering wires into production.

**Core Artifacts**
1. `bestbuy-agent.md`
   - Agent persona, tone rules:
     - Be budget-sensitive.
     - Always offer a human.
     - Always surface membership math.
     - Never shame or upsell aggressively.
2. `interaction-tiles.json`
   - Canonical UI cards:
     - Bundle Card
     - Fulfillment Strip
     - Membership Upsell Strip
     - Install Slot Picker
3. `fulfillment-intents.yml`
   - Normalized verbs:
     - `pickup_in_store`
     - `same_day_delivery`
     - `book_install`
     - `recycle_old`
     - `extend_protection`
4. `care-profile.schema.json`
   - Minimal fields for aging-at-home:
     - mobility_level
     - emergency_contact_number
     - fall_alerts_enabled (yes/no)
     - share_alerts_with (list of caregivers)

**Workflow**
- Design/PM edits these specs in plain English + structured JSON/YAML.
- LLM agent consumes them in sandbox.
- Engineering connects intents to live APIs (inventory, Geek Squad scheduling, membership billing).

**Why this matters**
- Best Buy is explicitly framing AI as a way to “unlock the power of people,” giving both associates and support teams better tools — not replacing them. citeturn0search0turn0search3turn0search6turn0news37
- Vibecoding does the same for product/design: empower humans closest to the customer to shape the agent’s behavior and offers.

---

## 10. Risks & Mitigations

**Trust / Privacy**
- Risk: “You’re mapping my living room / monitoring my dad.”
- Mitigation:
  - Granular opt-in.
  - Clear data badges (“Only used to plan install” / “Only shared with approved caregiver”).
  - Right-to-delete dashboard.

**Hard Sell / Upsell Ethics**
- Risk: Agent perceived as pushing expensive bundles or memberships.
- Mitigation:
  - Always show a cost-conscious option.
  - Always show ‘math of membership’ (how Plus/Total could save money for THIS cart). citeturn0search4turn0search15turn0news38

**Capacity & Ops Load**
- Risk: Agent overpromises same-day install / haul-away.
- Mitigation:
  - Fulfillment API only surfaces real availability windows.
  - Dynamic throttling: no slot, no promise.

**Org Complexity**
- Risk: Requires coordination across e-commerce, Geek Squad field ops, membership, Best Buy Health, supply chain, Best Buy Ads.
- Mitigation:
  - Start in service (Phase 0) and 1–2 hero retail categories (Phase 1).
  - Instrument KPIs before expanding.

---

## 11. Leadership Ask (Monday)

**Decision Needed**
1. Approve “My Tech Pro” as a named, branded pilot experience.
2. Align on Phase 0 (support concierge) + Phase 1 (Laptop / TV bundles with install & membership attach).
3. Commit to success metrics:
   - Conversion lift
   - Bundle attach rate
   - Membership upgrade rate
   - Handle-time reduction / CSAT

**Story to Tell**
- Best Buy is not just “where you buy electronics.”
- Best Buy becomes:
  - Your personal tech concierge,
  - Your in-home installer,
  - Your ongoing safety net (Geek Squad + aging-at-home care),
  - And your upgrade planner.

That is agentic commerce — and Best Buy is structurally positioned to own it first.

---
