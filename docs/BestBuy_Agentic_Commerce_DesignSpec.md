# Best Buy Agentic Commerce – Design Spec (Draft v0.1)

_Last updated: Oct 25, 2025_  
_Context: Future “agentic commerce” BestBuy.com experience. Goal is alignment with Best Buy’s live brand (blue/yellow heritage, new “imagine that.” platform with magenta/teal/red accents, concierge-style service, AI + human). citeturn0search0turn0search3turn0search6turn0search21_

---

## 0. Brand Platform Alignment

- **Who Best Buy is becoming**
  - Shift from “electronics store” → “personal tech concierge for life moments” (home theater, caregiving, connected kitchen, creator setup). Best Buy’s July 2024 brand refresh explicitly reframed the company around discovery and possibility, not just specs. citeturn0search0turn0search3turn0search15turn0search18
  - The new brand tagline is **“imagine that.”** and Best Buy is rolling out a hologram spokesperson (“Gram”) to humanize guidance and make tech feel approachable. citeturn0search0turn0search3turn0search6turn0search21
  - The color palette is expanding beyond the classic blue + yellow to include **magenta, teal, and red**, signaling discovery and future energy. citeturn0search0turn0search3turn0search6turn0search21

- **Human + AI**
  - Best Buy is partnering with **Google Cloud + Accenture** to launch a generative AI assistant for customers and frontline associates. The assistant will troubleshoot issues, reschedule deliveries, manage Geek Squad and My Best Buy Memberships, etc. citeturn0search1turn0search4turn0search10turn0search22
  - This AI is *augmenting humans*, not replacing them. Verizon’s similar AI assistant for human reps drove ~40% sales lift by freeing reps from lookup work so they could advise and sell. citeturn0news31

**Design north star:**  
> “It should feel like talking to your trusted Blue Shirt in-store — but now that expert lives in the site, knows your setup, and can actually book install, protection, and upgrades for you.”

---

## 1. Design System Principles

- **Confidence, not noise**
  - We show 1–2 “total solutions,” not 40 SKUs. We surface total cost (device + setup + protection + membership) so buyers feel certain, not overwhelmed.  
  - My Best Buy Plus / Total bundles 24/7/365 Geek Squad support, extended protection (including AppleCare+‑style coverage), and exclusive benefits, so membership becomes part of “the solution,” not an upsell afterthought. citeturn0search1turn0search4turn0search15turn0search22

- **Service is part of the product**
  - Recommendations must always include install windows, pickup/delivery speed, and haul-away/recycling. Best Buy already differentiates on Geek Squad in‑home install, curbside pickup and same/next‑day delivery. citeturn0search1turn0search22  

- **Discovery energy**
  - We use accent color (magenta / teal / red) and micro-motion for “imagine that.” moments — places where we inspire (“Here’s your dream editing rig set up tonight”). These are brand-new accent tones Best Buy is introducing alongside blue/yellow. citeturn0search0turn0search3turn0search6turn0search21  

- **Inclusive + accessible**
  - Best Buy states it’s committed to a barrier-free digital experience for people with disabilities across web, mobile apps, and online services, aligned with W3C guidelines. citeturn0search2turn0search5turn0search8  
  - We design for WCAG AA+: clear contrast, readable text sizes, visible focus states, and human escalation for people who prefer talking to a person.

- **Trust + privacy**
  - When we ask for sensitive info (room layout scans for install; fall-detection alerts for aging parents), we explain why and how it’s used. Best Buy is actively moving into aging-at-home and assistive tech journeys. citeturn0search8turn0search18

---

## 2. Brand Foundations & Tokens

### 2.1 Color System

**Core heritage colors**
- **Best Buy Blue**  
  - Deep/blended retail and digital blues are part of Best Buy’s long-standing identity and UI chrome.
- **Best Buy Yellow (Tag Yellow)**  
  - Bright yellow historically used in the price tag logo; used for urgency, “deal,” or “member value.”
- **Charcoal / Black**
  - High-trust body text and pricing.
- **White**
  - Clean surfaces for clarity and accessibility.

**New accent expansion**
- **Magenta / Teal / Red**
  - As of the 2024 refresh, Best Buy says it is “adding hints of magenta, teal and red alongside its iconic blue and yellow,” and phasing this in across channels. These colors signal discovery, curiosity, and “what if?” — the emotional side of “imagine that.” citeturn0search0turn0search3turn0search6turn0search21  

**Token proposal (semantic, not final hex)**

```yaml
color.tokens:
  brand.blue.primary: "#003B64"       # deep trust blue (placeholder reference)
  brand.blue.alt: "#0A4ABF"           # brighter call-to-action blue (placeholder)

  brand.yellow.primary: "#FFF200"     # price tag / urgency / deal badge (placeholder)

  text.primary: "#1C252C"             # charcoal for body copy
  text.inverse: "#FFFFFF"

  surface.default: "#FFFFFF"
  surface.alt: "#F5F5F5"
  border.subtle: "rgba(0,0,0,0.08)"

  accent.magenta: "TBD_brand"         # discovery & “imagine that.” storytelling
  accent.teal:    "TBD_brand"
  accent.red:     "TBD_brand"
```

**Usage**
- Blue = trust, structural nav, CTAs.
- Yellow = value badge, “member deal,” “install included.”
- Magenta/teal/red = discovery, future, “imagine that.” storytelling (creator rigs, aging-at-home safety bundle).
- Charcoal on white = default reading environment for accessibility. citeturn0search2turn0search5turn0search8  

---

### 2.2 Typography

- Best Buy uses a customized **Avenir Next** family (“Avenir Next for Best Buy”) across marketing and digital touchpoints, chosen for modern, approachable, high-legibility sans-serif tone. Reported usage highlights multiple weights for headline and body to keep copy clear and human. citeturn0search15turn0search24  
- The 2018+ wordmark moved “Best Buy” out of the yellow tag and into bold black text beside a simplified yellow tag for better digital readability. That modernized look still underpins the current system. citeturn1search3turn2search6

**Token suggestion**

```yaml
typography.tokens:
  font.family.primary: "Avenir Next for Best Buy, Avenir Next, Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

  font.size.display-xl: 32px   # hero / “imagine that.” storytelling
  font.size.display-lg: 28px
  font.size.h1:        24px    # solution card title
  font.size.h2:        20px    # sub-section headers
  font.size.body-lg:   18px    # persuasive explainer copy
  font.size.body-md:   16px    # default body text
  font.size.body-sm:   14px    # legal / microcopy

  font.weight.bold:    600-700
  font.weight.semibold:500-600
  font.weight.regular: 400
```

Rules:
- Headline tone = confident, conversational, not shouty.
- Body at 16–18px minimum for clarity and accessibility (Best Buy publicly commits to barrier-free digital access). citeturn0search2turn0search5turn0search8  

---

### 2.3 Iconography & Character

- Icon style: simple line / minimal fill, slightly rounded corners → feels helpful, not “industrial.”
- Associate / expert avatar:
  - Best Buy introduced **“Gram,”** a hologram-style spokesperson in marketing to showcase guidance and discovery. Gram signals “I’ll help you imagine what’s possible.” citeturn0search0turn0search3turn0search6turn0search21  
  - In-product, the concierge/agent (“My Tech Pro”) can echo Gram’s friendly, futuristic vibe but should stay utility-first: calm blue/charcoal base with an accent ring (magenta/teal/red gradient glow) to visually connect to the new brand.

---

### 2.4 Tag Badge

- The yellow tag is still iconic. After the 2018 redesign, the wordmark sits next to a simplified yellow tag, not inside it, to modernize for digital. citeturn1search3turn2search6  
- In UI, use a compact yellow tag badge to flag:
  - “Member price”
  - “Install included”
  - “Pickup today”
- Keep tag geometry consistent, black/charcoal text on yellow for contrast.

---

## 3. Layout & Core Components

### 3.1 Global Header / Navigation
- Nav aligns with current IA patterns: “Top Deals,” “Deal of the Day,” “My Best Buy Memberships,” Support/Orders, Sign in. (Observed on BestBuy.com.)  
- Add a persistent **“My Tech Pro”** entry point in the header:
  - Pill button with subtle accent glow (magenta↔teal micro-pulse) to say “Ask me anything.”
- Sticky header on scroll for both desktop and mobile.

### 3.2 “My Tech Pro” Drawer / Panel (Agent Surface)
- Right-side drawer (desktop) / full-screen (mobile).
- Top: short conversation summary (“Here’s what I heard”).
- Middle: 1–2 **Solution Cards** (see 3.3).
- Bottom: dual action row  
  - Primary CTA = “Book this bundle”  
  - Secondary CTA = “Talk to a real expert now”
- This matches Best Buy and Google Cloud’s stated plan for generative AI that can self-serve *and* escalate to associates. citeturn0search1turn0search4turn0search10turn0search22

Visual:
- Header band can lightly use accent.magenta / accent.teal gradient wash (~5–10% tint) to tie to “imagine that.” without overwhelming. citeturn0search0turn0search3turn0search6turn0search21  
- Body stays white for clarity, with charcoal text.

### 3.3 Solution Card (Bundle Card)
Purpose:
- Replace SKU spam with “Here’s the setup that fits you and why,” including service and logistics.
- Aligns with Best Buy’s move toward helping customers *discover what’s possible* and get it installed, not just pick a product. citeturn0search0turn0search3turn0search15turn0search18

Content blocks:
- **Title**: “Creator Video Edit Setup – Pro”
- **What’s Included**:
  - Hardware (e.g. AI laptop / 4K monitor)
  - Services (data transfer, Geek Squad in-home setup)
  - Protection & Membership (AppleCare+‑style coverage via My Best Buy Total, 24/7 Geek Squad, extended returns) citeturn0search1turn0search4turn0search15turn0search22
  - Haul-away / recycle
- **Fulfillment Strip** (see 3.4)
- **Cost Summary**:
  - One-time and/or monthly
- **Why This Pick**:
  - Plain-language rationale, not spec dump.

Visual:
- Card surface: white with subtle border (`border.subtle`).
- Header row: blue text + small yellow tag badge for “Member price” or “Install included.”
- CTA area:
  - Primary CTA button: solid blue, white text
  - Secondary link: “Talk to a Blue Shirt now” with headset/video icon

### 3.4 Fulfillment Strip
- Horizontal row of chips under each Solution Card:
  - “Pickup today (1 hr) @ [Store Name]”
  - “Deliver tonight 7–9pm”
  - “Geek Squad install tomorrow 8–10am”
  - “Recycle old TV ✔”
- Best Buy’s gen AI assistant is explicitly supposed to help with delivery rescheduling, Geek Squad services, and membership-linked entitlements, so surfacing this in-line matches strategy. citeturn0search1turn0search4turn0search10turn0search22
- Visual:
  - Chip bg: very light blue / gray
  - Icon: blue outline
  - Use yellow tag badge only for “member perk,” “install included,” or “pickup today”

### 3.5 Membership Upsell Banner
- Inline banner inside cart / Solution Card:
  - “My Best Buy Total™ can cover setup, 24/7 support, and extended protection for everything in this bundle. See how much you save.”
- Must show math: “This plan saves you $X vs. buying protection + install separately,” which mirrors the membership value prop messaging. citeturn0search1turn0search4turn0search15turn0search22
- Visual:
  - White background
  - Border-left: 4px brand.blue.alt
  - Small yellow tag badge to connect to recognizable “deal/value” signal

### 3.6 Support / Service Action Tiles
- Tiles for post-purchase flows:
  - “Reschedule delivery”
  - “Start a return”
  - “Extend protection”
  - “Schedule Geek Squad”
  - “Chat with an expert now”
- These mirror actual AI assistant use cases: troubleshooting, delivery management, membership support. citeturn0search1turn0search4turn0search10turn0search22
- Visual:
  - 2-col grid on mobile / 3-col+ on desktop
  - White cards, thin border
  - 16–18px semibold headline, 14px helper line
  - Full-tile click target with 2px blue focus ring for accessibility

### 3.7 Inputs / Clarifiers (“Help us help you”)
- The agent asks:
  - Budget ceiling
  - Primary use case (gaming, creator work, senior safety)
  - Install urgency
- Input style:
  - Quick chips + short text field
  - Blue outline focus ring, 16px body-md
- Privacy microcopy when collecting caregiving / health / home-layout info:
  - “We’ll only use this to set up safety alerts for your dad and send them to you. You control who sees them.”  
  - Matches Best Buy’s assistive tech / aging-at-home narrative. citeturn0search8turn0search18

---

## 4. Motion & Micro-Behavior

- **Assistant Drawer Reveal**
  - Slide-in from right (desktop) / up from bottom (mobile), ~200–250ms ease-out.
  - Behavior target: friendly/helpful, not interruptive pop-up.

- **Accent Pulse**
  - The “My Tech Pro” pill in header uses a subtle magenta↔teal glow pulse (1–2s loop at low opacity) to signal “Ask me anything,” tying into the new color palette and “imagine that.” positioning around discovery. citeturn0search0turn0search3turn0search6turn0search21  

- **Fulfillment Slot Confirmation**
  - When slot selected, show toast:
    - “Locked in tomorrow 8–10am + haul-away ✔”
  - Toast style: blue bg, white text, rounded 6px corners, 2–3 seconds, dismissible.

---

## 5. Voice & Copy Guidelines

- **Tone**
  - Calm, expert, budget-aware.
  - “Here’s the setup I’d recommend under $1,000 that can handle 4K video smoothly tonight.”
  - No shame, no scare tactics.

- **Structure**
  - Lead with benefit (“We can install this and recycle your old TV tomorrow”).
  - Then explain parts of the bundle (device, setup, protection, membership).

- **Membership framing**
  - “Your My Best Buy Total™ plan already includes 24/7 Geek Squad and extended protection for all your tech, so this visit is covered.”  
  - Mirrors published membership positioning (24/7 support, bundled protection, exclusive value). citeturn0search1turn0search4turn0search15turn0search22  

- **“imagine that.” energy**
  - Use possibility questions (“Want to see this setup in your space tonight?”) because Best Buy’s refreshed brand explicitly uses “imagine that” / “what if?” language to spark curiosity and discovery. citeturn0search0turn0search3turn0search15turn0search18  

- **Escalation to human**
  - Always offer: “Prefer a real person? Talk to a Blue Shirt now.”
  - Aligns with Best Buy’s stated approach: AI helps, but human associates and Geek Squad remain core. citeturn0search1turn0search4turn0search10turn0search22  

- **Privacy in caregiving / home context**
  - Explicitly tell them why we ask health/safety or room layout questions and who will see that data. This supports trust in Best Buy’s assistive / aging-at-home tech and aligns with accessibility and privacy commitments. citeturn0search2turn0search5turn0search8turn0search14  

---

## 6. Accessibility & Inclusion

Best Buy states it strives for a barrier-free digital environment and aligns to W3C accessibility guidelines for its websites, mobile apps, and digital offerings. citeturn0search2turn0search5turn0search8  

**Requirements**
- **Contrast**
  - All text/button fg:bg meets WCAG 2.1 AA.
  - Yellow tag is ONLY used with high-contrast black/charcoal text.
- **Text size**
  - Min 14px body-sm; default body 16px+.
- **Focus states**
  - Every interactive tile/chip/button must show a visible 2px focus ring (blue or high-contrast outline).
- **Keyboard / screen reader**
  - “My Tech Pro” panel must be linear-nav friendly.
  - ARIA label for bundle cards must summarize the full service (“Creator Video Edit Setup: includes laptop, data transfer, install tomorrow 8–10am, and haul-away.”).
- **Human escalation**
  - A direct “Talk to a human expert now” option is always present. This supports users who cannot or do not want to self-serve via AI-only flow. citeturn0search1turn0search4turn0search10turn0search22  

---

## 7. Component Specs (Dev-Ready Tokens)

### 7.1 Primary CTA Button
```yaml
button.primary:
  bg: brand.blue.primary
  text: text.inverse
  radius: 8px
  hover.bg: darken(brand.blue.primary, 8%)
  focus.outline: 2px brand.yellow.primary
```

### 7.2 Secondary CTA / Expert Link
```yaml
button.secondaryLink:
  text.color: brand.blue.primary
  icon: headset/video_call
  hover.text.decoration: underline
```

### 7.3 Tag Badge
```yaml
badge.tag:
  shape: "bestbuy-tag"
  bg: brand.yellow.primary
  text.color: text.primary
  usage:
    - "Member price"
    - "Install included"
    - "Pickup today"
```

### 7.4 Fulfillment Chip
```yaml
chip.fulfillment:
  bg: surface.alt
  border: 1px border.subtle
  text.color: text.primary
  icon.color: brand.blue.alt
  variants:
    pickup
    delivery
    install
    recycle
```

### 7.5 Membership Banner
```yaml
banner.membership:
  bg: surface.default
  border.left: 4px brand.blue.alt
  badge: badge.tag (inline)
  headline.size: font.size.body-lg
  body.size: font.size.body-md
  cta: "See how much you save"
  copy.rationale:
    - "This saves you $X vs buying protection + install separately."
```

### 7.6 “My Tech Pro” Drawer Header
```yaml
drawer.header:
  avatar.ring: gradient(accent.magenta -> accent.teal) @10% opacity
  title.size: font.size.h1
  title.weight: semibold
  subtext.size: font.size.body-md
  actions:
    primary: "Book this bundle"
    secondary: "Talk to a real expert"
```

---

## 8. Do / Don’t

**Do**
- Use blue/yellow for trust, value, install promise, membership value. citeturn0search0turn0search3turn0search6turn0search21  
- Use magenta/teal/red sparingly for “imagine that.” discovery beats, not for core transactional CTAs. citeturn0search0turn0search3turn0search6turn0search21  
- Surface install windows, pickup timing, and haul-away *in the recommendation*, not hidden in checkout. citeturn0search1turn0search4turn0search22  
- Always provide a “Talk to a Blue Shirt now” escalation — AI + human is literally the Best Buy strategy. citeturn0search1turn0search4turn0search10turn0search22  
- Respect accessibility (contrast, text size, focus states, screen reader labels). citeturn0search2turn0search5turn0search8  
- Explain privacy when asking for room scans, delivery windows, or caregiving context. citeturn0search8turn0search14  

**Don’t**
- Don’t spam specs or 40 SKUs. Bundle + explain.
- Don’t present membership as pure upsell without math.
- Don’t flood core flows with magenta/teal/red; keep those accents for inspiration zones (“imagine that.”).
- Don’t hide human help.  

---

## 9. Open Questions (For Exec Alignment)

1. Can Brand/Marketing provide official digital hex values for new accent.magenta / accent.teal / accent.red so we can lock tokens? citeturn0search0turn0search3turn0search6turn0search21  
2. Confirm typography: Is “Avenir Next for Best Buy” still the approved digital family for product surfaces, or do we fall back to system-ui for web MVP? citeturn0search15turn0search24  
3. Do we make “My Tech Pro” *visually* Gram (marketing hologram) or keep Gram for campaigns and keep a more utility avatar in-product? citeturn0search0turn0search3turn0search6turn0search21  
4. For aging-at-home bundles, which data fields (fall alerts, vitals, caregiver contacts) are considered health data and require explicit consent banners under Best Buy privacy policy? citeturn0search8turn0search14  
5. Can we reuse the yellow tag badge for service promises (“Install included”) or is that visually reserved 100% for deals/pricing?

---

### TL;DR for Vibecoding
- **Palette**  
  - Core: blue / yellow / charcoal / white  
  - Accent (new): magenta / teal / red → only for discovery / “imagine that.” energy
- **Type**  
  - Avenir Next for Best Buy (geometric, approachable, high legibility)
- **Core Surfaces**  
  - Sticky header with “My Tech Pro” pill  
  - Right-side assistant drawer  
  - Solution Card with fulfillment strip + membership math  
  - Yellow tag badge for member value, install included, pickup today
- **Voice**  
  - Confident, budget-aware, respectful  
  - Always shows service, install, and human escalation  
  - Always discloses privacy

---

navlistBest Buy brand refresh, AI assistant & accessibilityturn0search0,turn0search1,turn0search2,turn0search6,turn0search21
