# Best Buy Agentic Commerce Platform

## 🚀 Overview

The Best Buy Agentic Commerce Platform is an AI-powered shopping experience that transforms traditional e-commerce into a personal tech concierge service. Built with Next.js 14, TypeScript, and AI agents, this platform delivers curated tech solutions, not just products.

### Key Features

- **My Tech Pro Agent**: Personal AI concierge that understands your needs and recommends complete solutions
- **Solution Bundles**: Curated packages including products, services, installation, and protection
- **Omnichannel Fulfillment**: Real-time pickup, delivery, and Geek Squad installation scheduling
- **Lifecycle Care**: Proactive support, warranty management, and upgrade recommendations
- **Aging-at-Home Solutions**: Specialized bundles for senior safety and independent living

## 📋 Product Requirements

Based on the [Product Requirements Document](docs/BestBuy_Agentic_Commerce_PRD.md), this platform implements:

1. **Personal Tech Concierge** - Persistent AI agent with budget-aware recommendations
2. **Solutions over SKUs** - Curated bundles instead of overwhelming product lists
3. **Omnichannel Fulfillment** - Integrated pickup, delivery, and installation
4. **Lifecycle Care** - Ongoing support and proactive maintenance
5. **Human Backup** - Seamless escalation to real Best Buy experts

## 🎨 Design System

Following the [Design Specification](docs/BestBuy_Agentic_Commerce_DesignSpec.md):

- **Brand Colors**: Best Buy Blue (#003B64), Yellow (#FFF200), with new accent colors (Magenta, Teal, Red)
- **Typography**: Avenir Next for Best Buy (clean, approachable, high-legibility)
- **Components**: Solution Cards, Fulfillment Strips, Tag Badges, Agent Drawer
- **Accessibility**: WCAG AA+ compliant with clear contrast, readable text, and focus states

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Best Buy design tokens
- **AI Integration**: OpenAI API, Vercel AI SDK
- **API Integration**: Best Buy Open API
- **State Management**: React Context + Hooks
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## 📁 Project Structure

```
bestbuy-agentic-commerce/
├── src/
│   ├── app/                 # Next.js 14 app directory
│   │   ├── api/             # API routes
│   │   ├── agent/           # Agent UI pages
│   │   ├── products/        # Product browsing
│   │   └── support/         # Support flows
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── agent/           # Agent-specific components
│   │   ├── commerce/        # E-commerce components
│   │   └── layout/          # Layout components
│   ├── services/
│   │   ├── agent.service.ts    # AI agent logic
│   │   └── bestbuy.service.ts  # Best Buy API integration
│   ├── types/               # TypeScript definitions
│   └── lib/                 # Utilities and constants
├── public/                  # Static assets
├── docs/                    # Documentation
└── tests/                   # Test files
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Best Buy API Key (get from [Best Buy Developer Portal](https://developer.bestbuy.com/))
- OpenAI API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bestbuy-agentic-commerce.git
cd bestbuy-agentic-commerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
```env
BESTBUY_API_KEY=your_bestbuy_api_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🤖 Agent Chat Flow

The **My Tech Pro** AI agent provides conversational product recommendations through natural language understanding. See [AGENT_CHAT_FLOW.md](AGENT_CHAT_FLOW.md) for complete implementation details.

### Quick Start Example

```typescript
// User: "I need a laptop for video editing under $2000"
// → AI extracts: { budget: 2000, useCase: 'video-editing', category: 'laptops' }
// → AI responds with clarifying questions
// → Generates 2 complete solution bundles
// → Shows products + services + installation + protection
```

### Key Features

- **Natural Language Understanding**: Extracts budget, use case, urgency from conversation
- **Context Building**: Maintains conversation history and builds customer profile
- **Smart Recommendations**: Generates bundles only when sufficient context available
- **Complete Solutions**: Shows hardware + services + installation + protection
- **Human Escalation**: Always offers path to real Best Buy experts

### Testing the Agent

1. Open the app at http://localhost:3000
2. Click "My Tech Pro" or the chat icon
3. Try these example queries:
   - "I need a laptop for video editing under $2000"
   - "Show me gaming setups for $1500"
   - "Help me set up a home theater"

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

### API Integration

The platform integrates with:

1. **Best Buy Open API** - Product search, inventory, store locations
2. **OpenAI API** - Agent intelligence and natural language processing
3. **Geek Squad Services** - Installation scheduling (mocked in development)

### Component Development

All components follow Best Buy's design system:

```tsx
// Example: Solution Card Component
import { SolutionCard } from '@/components/commerce/SolutionCard'

<SolutionCard
  bundle={solutionBundle}
  onSelect={handleSelection}
  showMembershipSavings
/>
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📈 Roadmap

### Phase 0 - Service Concierge ✅
- Support and order management flows
- Natural language processing for common requests

### Phase 1 - High-Value Bundles (In Progress)
- Laptop and TV bundle recommendations
- Complete solution packages with services

### Phase 2 - Room Planner
- Spatial AR design for home theater/office
- Direct Geek Squad scheduling integration

### Phase 3 - Aging-at-Home Safety
- Senior safety monitoring bundles
- Caregiver dashboard and alerts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Best Buy Developer Team for API access
- OpenAI for GPT-4 integration
- Vercel for hosting and AI SDK
- Design inspiration from Best Buy's "imagine that." campaign

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact the development team
- Check the [documentation](docs/)

---

Built with ❤️ for the future of agentic commerce