import { NextRequest, NextResponse } from 'next/server'
import { AgentContext, SolutionBundle } from '@/types/agent'
import bestBuyService from '@/services/bestbuy.service'

export async function POST(request: NextRequest) {
  try {
    const context: AgentContext = await request.json()

    // Generate recommendations using Best Buy API and context
    const bundles: SolutionBundle[] = await generateMockBundles(context)

    return NextResponse.json(bundles)
  } catch (error) {
    console.error('Agent recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}

async function generateMockBundles(context: AgentContext): Promise<SolutionBundle[]> {
  // Generate bundles based on context
  const bundles: SolutionBundle[] = []
  
  // Try to fetch real products from Best Buy API
  let realProducts = []

  if (context.useCase?.includes('video') || context.useCase?.includes('edit')) {
    bundles.push({
      id: '1',
      name: 'Creator Video Edit Setup - Pro',
      description: 'Professional-grade video editing with M3 MacBook Pro',
      products: [
        {
          id: 'p1',
          sku: 'MBP16-M3-MAX',
          name: 'MacBook Pro 16" M3 Max',
          price: 3499,
          image: '/placeholder-laptop.jpg',
          category: 'Laptops',
          inStock: true,
        },
        {
          id: 'p2',
          sku: 'LG-4K-27',
          name: 'LG 27" 4K Monitor',
          price: 499,
          image: '/placeholder-monitor.jpg',
          category: 'Monitors',
          inStock: true,
        },
      ],
      services: [
        {
          id: 's1',
          type: 'data-transfer',
          name: 'Data Transfer & Setup',
          price: 99,
          description: 'Transfer all files and set up your editing software',
        },
        {
          id: 's2',
          type: 'protection',
          name: 'AppleCare+ 3-Year',
          price: 379,
          description: 'Complete hardware coverage and 24/7 support',
        },
      ],
      totalPrice: {
        oneTime: 4476,
        monthly: 186,
      },
      fulfillment: [
        {
          type: 'pickup',
          available: true,
          timing: 'Ready in 1 hour',
          location: 'Best Buy Union Square',
        },
        {
          type: 'delivery',
          available: true,
          timing: 'Tonight 7-9pm',
          price: 0,
        },
        {
          type: 'installation',
          available: true,
          timing: 'Tomorrow 8-10am',
          price: 0,
        },
      ],
      membershipSavings: 200,
      whyThisPick: 'The M3 Max chip handles 8K footage smoothly, and the 4K monitor provides accurate color grading. With same-day setup and data transfer, you can start editing tonight.',
    })
  }

  if (context.budget && context.budget < 2000) {
    bundles.push({
      id: '2',
      name: 'Creator Video Edit Setup - Good',
      description: 'Budget-friendly video editing with M2 MacBook Air',
      products: [
        {
          id: 'p3',
          sku: 'MBA-M2-15',
          name: 'MacBook Air 15" M2',
          price: 1299,
          image: '/placeholder-laptop.jpg',
          category: 'Laptops',
          inStock: true,
        },
      ],
      services: [
        {
          id: 's3',
          type: 'data-transfer',
          name: 'Data Transfer Service',
          price: 99,
          description: 'Transfer all your files from old device',
        },
        {
          id: 's4',
          type: 'protection',
          name: 'AppleCare+ 2-Year',
          price: 199,
          description: '2-year protection plan',
        },
      ],
      totalPrice: {
        oneTime: 1597,
        monthly: 67,
      },
      fulfillment: [
        {
          type: 'pickup',
          available: true,
          timing: 'Ready in 1 hour',
          location: 'Best Buy Union Square',
        },
        {
          type: 'installation',
          available: true,
          timing: 'Tomorrow 8-10am',
          price: 0,
        },
      ],
      membershipSavings: 150,
      whyThisPick: 'Great performance for 1080p and 4K editing within your budget. The M2 chip is efficient and powerful enough for most content creation needs.',
    })
  }

  // Home theater bundle
  if (context.useCase?.includes('theater') || context.useCase?.includes('tv')) {
    bundles.push({
      id: '3',
      name: 'Ultimate Home Theater Bundle',
      description: 'Complete 75" 4K theater with Geek Squad installation',
      products: [
        {
          id: 'p4',
          sku: 'SONY-75-X90L',
          name: 'Sony 75" 4K Smart TV X90L',
          price: 1799,
          image: '/placeholder-tv.jpg',
          category: 'TVs',
          inStock: true,
        },
        {
          id: 'p5',
          sku: 'SONOS-ARC',
          name: 'Sonos Arc Soundbar',
          price: 899,
          image: '/placeholder-soundbar.jpg',
          category: 'Audio',
          inStock: true,
        },
      ],
      services: [
        {
          id: 's5',
          type: 'installation',
          name: 'Complete Home Theater Install',
          price: 199,
          description: 'Wall mount TV, set up soundbar, optimize audio',
        },
        {
          id: 's6',
          type: 'recycling',
          name: 'Old TV Haul Away',
          price: 0,
          description: 'We\'ll recycle your old TV responsibly',
        },
        {
          id: 's7',
          type: 'protection',
          name: '5-Year Geek Squad Protection',
          price: 449,
          description: 'Complete coverage for TV and audio',
        },
      ],
      totalPrice: {
        oneTime: 3346,
        monthly: 139,
      },
      fulfillment: [
        {
          type: 'delivery',
          available: true,
          timing: 'Tomorrow',
          price: 0,
        },
        {
          type: 'installation',
          available: true,
          timing: 'Day after tomorrow 10am-12pm',
          price: 199,
        },
      ],
      membershipSavings: 250,
      whyThisPick: 'This Sony TV delivers stunning 4K HDR with full-array local dimming, and the Sonos Arc provides cinema-quality Dolby Atmos sound. Professional installation ensures perfect placement and calibration.',
    })
  }

  // Default bundle if nothing matches
  if (bundles.length === 0) {
    bundles.push({
      id: '999',
      name: 'Recommended Starter Bundle',
      description: 'A versatile setup for everyday computing and entertainment',
      products: [
        {
          id: 'p99',
          sku: 'LAPTOP-GENERAL',
          name: 'HP Pavilion Laptop',
          price: 799,
          image: '/placeholder-laptop.jpg',
          category: 'Laptops',
          inStock: true,
        },
      ],
      services: [
        {
          id: 's99',
          type: 'protection',
          name: 'Geek Squad Protection',
          price: 149,
          description: '2-year protection plan',
        },
      ],
      totalPrice: {
        oneTime: 948,
        monthly: 40,
      },
      fulfillment: [
        {
          type: 'pickup',
          available: true,
          timing: 'Ready in 1 hour',
          location: 'Nearest Best Buy',
        },
      ],
      membershipSavings: 100,
      whyThisPick: 'A solid all-around laptop for everyday tasks, with Geek Squad protection for peace of mind.',
    })
  }

  return bundles
}
