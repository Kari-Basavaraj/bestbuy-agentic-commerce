# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Best Buy Agentic Commerce Platform - An AI-powered shopping experience that transforms traditional e-commerce into a personal tech concierge service. This platform implements the "agentic commerce" vision where customers get a persistent AI agent ("My Tech Pro") that understands their needs, designs complete solutions (products + services + installation + protection), and manages the entire lifecycle from purchase through ongoing support.

## Technology Stack

- **Frontend**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Best Buy design tokens
- **AI Integration**: OpenAI API via Vercel AI SDK (@vercel/ai)
- **API Integration**: Best Buy Open API for products, inventory, and store data
- **State Management**: React Context API + Hooks (no Redux/Zustand)
- **Deployment**: Vercel

## Development Commands

### Essential Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type-check TypeScript without emitting files
npm run type-check
```

### Environment Setup

Required environment variables (create `.env.local` from `.env.example`):
- `BESTBUY_API_KEY` - Best Buy Developer API key
- `OPENAI_API_KEY` - OpenAI API key for agent intelligence
- `NEXT_PUBLIC_APP_URL` - Application URL (default: http://localhost:3000)

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes (agent recommendations, etc.)
│   ├── agent/             # Agent UI pages
│   ├── products/          # Product browsing
│   ├── room-planner/      # Spatial AR planning
│   └── support/           # Support flows
├── components/            # React components (organize by domain)
│   ├── ui/               # Reusable UI primitives
│   ├── agent/            # Agent-specific components
│   ├── commerce/         # E-commerce components (Solution Cards, etc.)
│   └── layout/           # Layout components
├── services/             # Business logic layer
│   ├── agent.service.ts     # AI agent orchestration
│   └── bestbuy.service.ts   # Best Buy API integration
├── types/                # TypeScript type definitions
│   └── agent.ts          # Core agent types (SolutionBundle, AgentContext, etc.)
└── lib/                  # Utilities and constants
```

### Key Architectural Concepts

#### Service Layer Pattern
All external API calls and business logic are encapsulated in service classes (`*.service.ts`). Components should never call APIs directly - they interact through services.

Example:
```typescript
// services/agent.service.ts exports a singleton
export default new AgentService()

// In components:
import agentService from '@/services/agent.service'
const bundles = await agentService.generateRecommendations(context)
```

#### Solution Bundle Architecture
The core data structure is `SolutionBundle` (not individual products). A bundle includes:
- Products (hardware)
- Services (data transfer, installation, protection, recycling)
- Fulfillment options (pickup/delivery/install timing)
- Membership savings
- Plain-language explanation ("whyThisPick")

This reflects the PRD's "Solutions over SKUs" principle - always recommend complete setups, not individual items.

#### Agent Context System
User interactions are captured in `AgentContext` which includes:
- Budget constraints
- Use case (video editing, gaming, caregiving, etc.)
- Urgency (today/tomorrow/this-week/flexible)
- Existing devices (for compatibility)
- Room dimensions (for spatial planning)
- Caregiving needs (for aging-at-home bundles)

The agent uses this context to generate personalized recommendations.

## Design System Implementation

### Brand Colors (Tailwind tokens)
```typescript
colors: {
  bestbuy: {
    blue: '#0046be',    // Primary brand color
    yellow: '#fff200',   // Price tag yellow (use with black text only)
    dark: '#1d252c',     // Charcoal text
  },
}
```

**Color Usage Rules**:
- Blue = trust, CTAs, structural elements
- Yellow = value badges, member deals, urgency indicators (ALWAYS with black/charcoal text for WCAG AA contrast)
- Accent colors (magenta/teal/red) = discovery moments, "imagine that." storytelling

### Typography
- Font family: Avenir Next for Best Buy (with system fallbacks)
- Minimum body text: 16px (accessibility requirement)
- Minimum microcopy: 14px
- Never go below 14px for any readable text

### Component Patterns

#### Solution Card
Must always show:
1. Bundle name and description
2. Complete list: products + services + protection
3. Fulfillment Strip (pickup/delivery/install options)
4. Total cost (one-time and/or monthly)
5. "Why this pick" explanation in plain language
6. Membership savings if applicable

#### Fulfillment Strip
Horizontal row of chips showing logistics:
- Pickup timing + location
- Delivery windows
- Geek Squad installation slots
- Haul-away/recycling availability

**Critical**: These are selling points, not afterthoughts. Logistics capabilities differentiate Best Buy.

## Code Conventions

### TypeScript
- Strict mode enabled
- All components and services must be fully typed
- Use `@/` path alias for imports from `src/`
- Define interfaces in `src/types/` for shared types
- Export types alongside implementation when logical

### Component Organization
- Use functional components with hooks (no class components)
- Co-locate related components in domain folders (agent/, commerce/, etc.)
- Keep UI primitives generic in `ui/`
- Business-specific components in domain folders

### API Routes
- Place in `src/app/api/`
- Use Next.js 14 Route Handlers (export async functions: GET, POST, etc.)
- Return JSON responses
- Handle errors gracefully with fallbacks

### State Management
- Use React Context for global state (user session, cart, agent conversation)
- Use local useState/useReducer for component-specific state
- No external state management libraries in current architecture

### Naming Conventions
- Components: PascalCase (e.g., `SolutionCard.tsx`)
- Services: camelCase with `.service.ts` suffix (e.g., `agent.service.ts`)
- Types: PascalCase for interfaces/types (e.g., `SolutionBundle`)
- API routes: kebab-case folders (e.g., `/api/agent/recommend`)

## Accessibility Requirements

This is a WCAG AA+ compliant application. Non-negotiable requirements:

1. **Contrast**: All text must meet WCAG 2.1 AA contrast ratios
2. **Focus states**: Every interactive element needs visible 2px focus ring
3. **Keyboard navigation**: All functionality accessible via keyboard
4. **ARIA labels**: Complex components (Solution Cards, bundle selectors) need descriptive ARIA labels
5. **Text size**: Minimum 14px, default 16px+
6. **Human escalation**: Always provide "Talk to a real expert" option

## Product Philosophy

### Core Principles from PRD

1. **Personal Tech Concierge**: The agent should feel like a trusted Blue Shirt who knows your setup and budget
2. **Solutions over SKUs**: Show 1-2 complete setups, not overwhelming product lists
3. **Service as Product**: Installation, data transfer, and protection are part of the recommendation
4. **Lifecycle Care**: Post-purchase support, proactive maintenance, upgrade planning
5. **Human Backup**: Always offer escalation to real Best Buy experts

### Agent Tone & Behavior
- Budget-aware (never shame or aggressively upsell)
- Calm and expert (not salesy)
- Transparent about costs (show total ownership cost upfront)
- Privacy-conscious (explain why collecting data, who sees it)
- Possibility-focused ("imagine that" energy)

### Membership Integration
Always surface the math for My Best Buy Plus/Total memberships:
- Show how membership saves money on THIS specific cart
- Never present membership as pure upsell - position as cost savings
- Include 24/7 Geek Squad support and extended protection in value calculation

## Testing Strategy

No test framework currently configured. When adding tests:
- Unit tests for service layer business logic
- Integration tests for API routes
- Component tests for complex UI (Solution Cards, agent interactions)
- Accessibility tests for WCAG compliance

## API Integration Notes

### Best Buy API
- Base URL: `https://api.bestbuy.com/v1`
- Requires API key in environment
- Returns product data, inventory, store locations
- Rate limits apply (monitor in production)

### OpenAI API
- Used for agent intelligence and NLU
- Model: GPT-4 (configurable via `OPENAI_MODEL` env var)
- Timeout: 30s (configurable via `AGENT_TIMEOUT_MS`)
- Max retries: 3 (configurable via `AGENT_MAX_RETRIES`)

### Image Optimization
Next.js Image component configured for Best Buy CDN domains:
- `pisces.bbystatic.com`
- `multimedia.bbycastatic.ca`

Always use Next.js `<Image>` component for product images to leverage optimization.

## Key Files to Understand

### Core Service Files
- `src/services/agent.service.ts` - AI agent orchestration, recommendation generation
- `src/services/bestbuy.service.ts` - Best Buy API client (to be implemented)

### Type Definitions
- `src/types/agent.ts` - Core domain types (SolutionBundle, Product, Service, FulfillmentOption, AgentContext)

### Configuration
- `next.config.js` - Image domains, React strict mode
- `tailwind.config.ts` - Best Buy brand colors
- `tsconfig.json` - Path aliases (@/*), strict mode enabled

## Documentation References

- Product Requirements: `/docs/BestBuy_Agentic_Commerce_PRD.md`
- Design Specification: `/docs/BestBuy_Agentic_Commerce_DesignSpec.md`
- Best Buy Developer Portal: https://developer.bestbuy.com/

## Common Development Patterns

### Creating a new Solution Bundle
```typescript
const bundle: SolutionBundle = {
  id: 'unique-id',
  name: 'Bundle Name',
  description: 'Short description',
  products: [...],
  services: [...],
  totalPrice: { oneTime: 0, monthly: 0 },
  fulfillment: [...],
  whyThisPick: 'Plain English explanation'
}
```

### Adding a new Agent Context field
1. Update interface in `src/types/agent.ts`
2. Update parsing logic in `agent.service.ts` `processUserInput()`
3. Update recommendation logic to use new field

### Creating a new API route
```typescript
// src/app/api/your-route/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  // Process...
  return Response.json({ result: data })
}
```

## Git Workflow

Standard feature branch workflow:
1. Create feature branch from main
2. Make changes, test locally
3. Run `npm run lint` and `npm run type-check`
4. Commit with descriptive messages
5. Create pull request for review

Excluded from git (see `.gitignore`):
- `node_modules/`
- `.next/`, `/out/`
- Environment files (`.env*.local`)
- IDE configs (`.vscode/`, `.idea/`)
- TaskMaster data (`.taskmaster/`)
