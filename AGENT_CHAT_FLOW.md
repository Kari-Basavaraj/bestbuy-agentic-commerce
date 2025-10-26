# Agent Chat Flow - Implementation Guide

## Overview

The Best Buy Agentic Commerce platform features an AI-powered conversational agent called "My Tech Pro" that guides customers through personalized product recommendations. This document explains how the chat flow works.

## Architecture

### Components

1. **AgentDrawer** (`src/components/agent/AgentDrawer.tsx`)
   - UI component for the chat interface
   - Manages message display and user input
   - Handles conversation state

2. **Chat API** (`src/app/api/agent/chat/route.ts`)
   - OpenAI-powered conversational AI
   - Context extraction and management
   - Triggers recommendation generation

3. **Recommendation API** (`src/app/api/agent/recommend/route.ts`)
   - Generates solution bundles based on context
   - Integrates with Best Buy API
   - Creates multi-tier bundles (Good/Better/Best)

4. **Agent Service** (`src/services/agent.service.ts`)
   - Client-side service for API calls
   - Context processing utilities

## Chat Flow

### 1. Initial Greeting

When the user opens the agent drawer, they see:
- Welcome message
- Example queries to get started
- Quick action buttons

### 2. Conversation Phase

**User Input → Context Extraction → AI Response**

```typescript
// User sends a message
"I need a laptop for video editing under $2000"

// System extracts context
{
  budget: 2000,
  useCase: 'video-editing',
  category: 'laptops'
}

// AI responds with clarifying questions
"Great! I can help you find the perfect video editing laptop. 
Do you need it today, or are you flexible on timing?"
```

### 3. Context Building

The AI extracts context from natural language:

**Budget Detection:**
- Matches dollar amounts: `$2000`, `2000 dollars`, `two thousand`
- Updates context only if not already set

**Use Case Detection:**
- `video editing` → `video-editing`
- `gaming` → `gaming`
- `work`, `office` → `work`
- `student`, `school` → `student`
- `coding`, `programming` → `development`
- `streaming` → `content-creation`

**Category Detection:**
- `laptop`, `notebook` → `laptops`
- `desktop`, `pc` → `desktops`
- `tv`, `television` → `tvs`
- `tablet`, `ipad` → `tablets`
- `phone` → `phones`
- `camera` → `cameras`
- `headphone`, `earbuds` → `audio`
- `home theater`, `soundbar` → `home-theater`

**Urgency Detection:**
- `today`, `asap`, `urgent` → `today`
- `tomorrow` → `tomorrow`
- `week`, `weekend` → `this-week`
- `flexible`, `whenever` → `flexible`

### 4. Recommendation Trigger

The system generates recommendations when:
- Minimum context is available (budget OR use case OR category)
- User expresses intent: `show me`, `recommend`, `find`, `looking for`, `need`, `want`, `search`

Example triggers:
- ✅ "I need a laptop" (has category + intent)
- ✅ "Show me gaming setups under $1500" (has use case + budget + intent)
- ❌ "What's the best brand?" (no context)
- ❌ "Tell me about laptops" (no intent to buy)

### 5. Bundle Generation

When triggered, the system:

1. **Searches products** via Best Buy API
   ```typescript
   bestBuyService.searchProducts(query, {
     maxPrice: context.budget,
     category: context.category,
     inStock: context.urgency === 'today'
   })
   ```

2. **Creates multi-tier bundles**
   - **Good**: Entry-level with essential services
   - **Better**: Enhanced with premium support
   - **Best**: Ultimate with complete care

3. **Adds services automatically**
   - Data Transfer Service ($99.99)
   - Geek Squad Protection ($179-$299)
   - Installation/Setup ($149.99)
   - 24/7 Support (included with Best tier)

4. **Calculates fulfillment options**
   - Pickup timing based on urgency
   - Delivery options
   - Installation scheduling

5. **Computes membership savings**
   - My Best Buy Plus benefits
   - My Best Buy Total benefits

### 6. Solution Presentation

Each bundle shows:
- Bundle name and description
- All products included
- All services included
- Fulfillment strip (pickup/delivery/installation)
- Total pricing (one-time and monthly options)
- Membership savings callout
- "Why this pick" explanation

### 7. Follow-up Conversation

After recommendations, users can:
- Ask questions about specific bundles
- Request modifications
- Compare options
- Ask about services or warranty
- Request human assistance

## API Endpoints

### POST /api/agent/chat

**Request:**
```json
{
  "message": "I need a laptop for video editing",
  "context": {
    "budget": 2000,
    "useCase": "video-editing"
  },
  "conversationHistory": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! How can I help you?" }
  ]
}
```

**Response:**
```json
{
  "response": "Great! I can help you find...",
  "context": {
    "budget": 2000,
    "useCase": "video-editing",
    "category": "laptops"
  },
  "shouldGenerateRecommendations": true
}
```

### POST /api/agent/recommend

**Request:**
```json
{
  "budget": 2000,
  "useCase": "video-editing",
  "category": "laptops",
  "urgency": "this-week"
}
```

**Response:**
```json
[
  {
    "id": "bundle-1",
    "name": "Creator Pro Video Setup - Good",
    "description": "Perfect for getting started...",
    "products": [...],
    "services": [...],
    "totalPrice": { "oneTime": 1577, "monthly": 0 },
    "fulfillment": [...],
    "membershipSavings": 150,
    "whyThisPick": "Great performance for video editing..."
  }
]
```

## Key Features

### 1. Conversational Memory
- Maintains conversation history
- Builds context across multiple messages
- References previous exchanges

### 2. Context Awareness
- Extracts structured data from natural language
- Updates context progressively
- Uses context to personalize responses

### 3. Smart Recommendation Triggering
- Waits for sufficient context
- Detects purchase intent
- Avoids premature recommendations

### 4. Solution-Focused Design
- Shows complete bundles, not just products
- Includes services as part of the solution
- Explains value proposition clearly

### 5. Human Escalation
- Always available option
- Offered when AI is uncertain
- Presented at natural conversation points

## Testing the Flow

### Test Scenario 1: Direct Request
```
User: "I need a laptop for video editing under $2000"
→ System extracts: budget=2000, useCase=video-editing, category=laptops
→ AI asks about urgency
→ User: "I need it this week"
→ System generates 2 bundles
→ User sees Solution Cards with complete packages
```

### Test Scenario 2: Gradual Discovery
```
User: "Hi, I need a new laptop"
→ AI asks: "What will you primarily use it for?"
→ User: "Video editing for YouTube"
→ AI asks: "What's your budget range?"
→ User: "Around $1500 to $2000"
→ AI asks: "When do you need it?"
→ User: "This weekend"
→ System generates bundles based on complete context
```

### Test Scenario 3: Refinement
```
User: "Show me gaming laptops"
→ System generates gaming bundles
→ User: "That's too expensive, show me something under $1200"
→ System regenerates with updated budget constraint
→ User: "Does this include a warranty?"
→ AI explains Geek Squad Protection included
```

## Environment Setup

Required environment variables:
```bash
OPENAI_API_KEY=sk-...           # OpenAI API key for chat
BESTBUY_API_KEY=...             # Best Buy API key
OPENAI_MODEL=gpt-4              # AI model (gpt-4 recommended)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Fallback Behavior

If APIs fail:
1. Chat falls back to error message with human escalation
2. Recommendations use mock bundles
3. User always has path to human support

## Best Practices

### For AI Responses
- Keep responses concise (2-4 sentences)
- Ask one question at a time
- Use plain language
- Signal when ready to recommend
- Always offer human option

### For Bundle Generation
- Show max 2 bundles at once
- Include "why this pick" explanation
- Display total cost upfront
- Highlight membership savings
- Show fulfillment options clearly

### For Error Handling
- Graceful degradation
- Clear error messages
- Human escalation path
- Never block the user

## Future Enhancements

1. **Multi-product Bundles**
   - Recommend complementary products
   - Create room setups (home theater, home office)

2. **Proactive Suggestions**
   - "You might also need..."
   - Accessory recommendations

3. **Comparison Mode**
   - Side-by-side bundle comparison
   - Feature matrix

4. **Save for Later**
   - Bookmark bundles
   - Email recommendations

5. **Voice Interface**
   - Voice input/output
   - Hands-free shopping

## Troubleshooting

**Issue: AI not generating recommendations**
- Check: Is context sufficient? (budget OR use case OR category)
- Check: Does message contain intent keywords?
- Check: OpenAI API key valid?

**Issue: Empty bundles returned**
- Check: Best Buy API key configured
- Check: Products available for search query
- Fallback: Mock bundles should display

**Issue: Chat responses generic**
- Check: Conversation history being passed
- Check: Context being updated
- Check: System prompt includes context

## Summary

The Best Buy Agentic Commerce chat flow creates a conversational shopping experience that:
- Understands natural language
- Builds customer context progressively
- Recommends complete solutions (not just products)
- Explains value clearly
- Always offers human backup

The implementation uses OpenAI for conversation, Best Buy API for products, and custom logic for bundle generation and context management.
