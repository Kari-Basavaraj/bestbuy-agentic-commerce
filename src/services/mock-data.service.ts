import type { SolutionBundle, Product, Service, AgentContext } from '@/types/agent'

class MockDataService {
  private laptopBundles: SolutionBundle[] = [
    {
      id: 'laptop-pro-bundle',
      name: 'Professional Creator Bundle',
      description: 'Complete setup for video editing and creative work',
      products: [
        {
          sku: '6535726',
          name: 'MacBook Pro 16" M3 Pro',
          price: 2499,
          category: 'laptops',
          brand: 'Apple',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6535/6535726_sd.jpg',
          rating: 4.8,
          reviewCount: 342
        },
        {
          sku: '6542896',
          name: 'LG UltraFine 5K Display',
          price: 1299,
          category: 'monitors',
          brand: 'LG',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6542/6542896_sd.jpg',
          rating: 4.6,
          reviewCount: 89
        },
        {
          sku: '6518101',
          name: 'CalDigit Thunderbolt 4 Dock',
          price: 299,
          category: 'accessories',
          brand: 'CalDigit',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6518/6518101_sd.jpg',
          rating: 4.7,
          reviewCount: 156
        }
      ],
      services: [
        {
          id: 'geek-squad-setup',
          name: 'Geek Squad Setup & Data Transfer',
          price: 149.99,
          type: 'installation',
          description: 'Professional setup and data migration'
        },
        {
          id: 'apple-care-plus',
          name: 'AppleCare+ for MacBook Pro',
          price: 399,
          type: 'protection',
          description: '3-year protection with accidental damage coverage'
        },
        {
          id: 'totaltech',
          name: 'Best Buy Totaltech Membership',
          price: 199.99,
          type: 'membership',
          description: 'Unlimited tech support, extended warranties, and free delivery',
          isAnnual: true
        }
      ],
      totalPrice: {
        oneTime: 4746.98,
        monthly: 0
      },
      memberPrice: {
        oneTime: 4496.98,
        monthly: 0
      },
      savingsAmount: 250,
      fulfillment: [
        { type: 'pickup', available: 'Today at Union Square', cost: 0 },
        { type: 'delivery', available: 'Tomorrow', cost: 0 },
        { type: 'installation', available: 'Schedule within 3 days', cost: 0 }
      ],
      whyThisPick: 'This professional setup combines the power of Apple Silicon with a stunning 5K display and convenient dock. Perfect for video editing with Final Cut Pro or Adobe Creative Suite. The Geek Squad will transfer all your data and set everything up.'
    },
    {
      id: 'laptop-value-bundle',
      name: 'Smart Student Bundle',
      description: 'Everything you need for school and entertainment',
      products: [
        {
          sku: '6534617',
          name: 'HP Envy x360 2-in-1 Laptop',
          price: 899,
          category: 'laptops',
          brand: 'HP',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6534/6534617_sd.jpg',
          rating: 4.5,
          reviewCount: 567
        },
        {
          sku: '6505727',
          name: 'Microsoft 365 Personal (1 Year)',
          price: 69.99,
          category: 'software',
          brand: 'Microsoft',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505727_sd.jpg',
          rating: 4.4,
          reviewCount: 2341
        },
        {
          sku: '6428991',
          name: 'Logitech MX Anywhere 3 Mouse',
          price: 79.99,
          category: 'accessories',
          brand: 'Logitech',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428991_sd.jpg',
          rating: 4.7,
          reviewCount: 892
        },
        {
          sku: '6474259',
          name: 'Targus 15.6" Laptop Backpack',
          price: 49.99,
          category: 'accessories',
          brand: 'Targus',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6474/6474259_sd.jpg',
          rating: 4.3,
          reviewCount: 234
        }
      ],
      services: [
        {
          id: 'geek-squad-protection',
          name: 'Geek Squad Protection (2 Years)',
          price: 179.99,
          type: 'protection',
          description: 'Covers drops, spills, and normal wear'
        },
        {
          id: 'setup-service',
          name: 'Device Setup & Training',
          price: 39.99,
          type: 'installation',
          description: 'Get your laptop ready to use with software installation'
        }
      ],
      totalPrice: {
        oneTime: 1318.94,
        monthly: 0
      },
      memberPrice: {
        oneTime: 1268.94,
        monthly: 0
      },
      savingsAmount: 50,
      fulfillment: [
        { type: 'pickup', available: 'Today at your store', cost: 0 },
        { type: 'delivery', available: '2-3 days', cost: 0 }
      ],
      whyThisPick: 'This 2-in-1 laptop is perfect for note-taking in tablet mode and powerful enough for all your coursework. Includes everything you need to stay productive with Microsoft 365 and a premium wireless mouse.'
    }
  ]

  private gamingBundles: SolutionBundle[] = [
    {
      id: 'gaming-ultimate-bundle',
      name: 'Ultimate Gaming Station',
      description: 'High-performance gaming PC with everything you need',
      products: [
        {
          sku: '6531354',
          name: 'ASUS ROG Strix Gaming Desktop',
          price: 1999,
          category: 'gaming-pcs',
          brand: 'ASUS',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6531/6531354_sd.jpg',
          rating: 4.7,
          reviewCount: 234
        },
        {
          sku: '6522329',
          name: 'LG 27" UltraGear QHD Gaming Monitor',
          price: 449,
          category: 'monitors',
          brand: 'LG',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6522/6522329_sd.jpg',
          rating: 4.8,
          reviewCount: 567
        },
        {
          sku: '6429947',
          name: 'Razer BlackWidow V3 Keyboard',
          price: 139,
          category: 'accessories',
          brand: 'Razer',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6429/6429947_sd.jpg',
          rating: 4.6,
          reviewCount: 892
        },
        {
          sku: '6384591',
          name: 'Razer DeathAdder V3 Pro Mouse',
          price: 149,
          category: 'accessories',
          brand: 'Razer',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6384/6384591_sd.jpg',
          rating: 4.7,
          reviewCount: 445
        },
        {
          sku: '6483639',
          name: 'SteelSeries Arctis Nova Pro Headset',
          price: 249,
          category: 'accessories',
          brand: 'SteelSeries',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6483/6483639_sd.jpg',
          rating: 4.8,
          reviewCount: 223
        }
      ],
      services: [
        {
          id: 'geek-squad-gaming-setup',
          name: 'Geek Squad Gaming PC Setup',
          price: 99.99,
          type: 'installation',
          description: 'Complete gaming setup with cable management'
        },
        {
          id: 'protection-plan',
          name: '3-Year Protection Plan',
          price: 299.99,
          type: 'protection',
          description: 'Covers hardware failures and power surges'
        }
      ],
      totalPrice: {
        oneTime: 3384.98,
        monthly: 0
      },
      memberPrice: {
        oneTime: 3184.98,
        monthly: 0
      },
      savingsAmount: 200,
      fulfillment: [
        { type: 'pickup', available: 'Today', cost: 0 },
        { type: 'delivery', available: 'Tomorrow with Totaltech', cost: 0 },
        { type: 'installation', available: 'Schedule this week', cost: 0 }
      ],
      whyThisPick: 'This RTX 4070-powered system handles any game at 1440p with high frame rates. The 165Hz monitor ensures smooth gameplay, while Razer peripherals provide the competitive edge. Complete with professional setup service.'
    }
  ]

  private tvBundles: SolutionBundle[] = [
    {
      id: 'tv-home-theater-bundle',
      name: 'Cinematic Home Theater',
      description: 'Transform your living room into a movie theater',
      products: [
        {
          sku: '6536942',
          name: 'LG 65" Class C3 Series OLED 4K TV',
          price: 1599,
          category: 'tvs',
          brand: 'LG',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6536/6536942_sd.jpg',
          rating: 4.8,
          reviewCount: 1234
        },
        {
          sku: '6530164',
          name: 'Sonos Arc Soundbar',
          price: 899,
          category: 'audio',
          brand: 'Sonos',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6530/6530164_sd.jpg',
          rating: 4.7,
          reviewCount: 892
        },
        {
          sku: '6530168',
          name: 'Sonos Sub (Gen 3)',
          price: 799,
          category: 'audio',
          brand: 'Sonos',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6530/6530168_sd.jpg',
          rating: 4.8,
          reviewCount: 445
        },
        {
          sku: '6454256',
          name: 'Apple TV 4K (128GB)',
          price: 149,
          category: 'streaming',
          brand: 'Apple',
          inStock: true,
          image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6454/6454256_sd.jpg',
          rating: 4.8,
          reviewCount: 2341
        }
      ],
      services: [
        {
          id: 'tv-mounting',
          name: 'TV Mounting & Setup Service',
          price: 199.99,
          type: 'installation',
          description: 'Professional wall mounting and calibration'
        },
        {
          id: 'geek-squad-protection-tv',
          name: '5-Year Geek Squad Protection',
          price: 349.99,
          type: 'protection',
          description: 'Covers everything including burn-in'
        },
        {
          id: 'haul-away',
          name: 'Old TV Haul Away & Recycling',
          price: 29.99,
          type: 'service',
          description: 'We\'ll recycle your old TV responsibly'
        }
      ],
      totalPrice: {
        oneTime: 3925.96,
        monthly: 0
      },
      memberPrice: {
        oneTime: 3725.96,
        monthly: 0
      },
      savingsAmount: 200,
      fulfillment: [
        { type: 'delivery', available: 'Free delivery Thursday', cost: 0 },
        { type: 'installation', available: 'Installation Friday', cost: 199.99 }
      ],
      whyThisPick: 'LG\'s OLED technology delivers perfect blacks and infinite contrast for the ultimate movie experience. Paired with Sonos premium audio, you\'ll feel like you\'re in the action. Our techs handle everything from delivery to mounting.'
    }
  ]

  async getRecommendations(context: AgentContext): Promise<SolutionBundle[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    let bundles: SolutionBundle[] = []

    // Select bundles based on context
    if (context.category === 'laptops' || context.useCase === 'work' || context.useCase === 'video-editing') {
      bundles = [...this.laptopBundles]
    } else if (context.category === 'gaming' || context.useCase === 'gaming') {
      bundles = [...this.gamingBundles]
    } else if (context.category === 'tvs' || context.useCase === 'entertainment') {
      bundles = [...this.tvBundles]
    } else {
      // Mix of different bundles
      bundles = [
        this.laptopBundles[0],
        this.gamingBundles[0],
        this.tvBundles[0]
      ]
    }

    // Filter by budget if specified
    if (context.budget) {
      bundles = bundles.filter(bundle => 
        bundle.totalPrice.oneTime <= context.budget! * 1.2 // Allow 20% over budget
      )
      
      // If no bundles in budget, return value options
      if (bundles.length === 0) {
        bundles = [this.laptopBundles[1]] // Return value bundle
      }
    }

    // Sort by relevance/price
    bundles.sort((a, b) => {
      // Prioritize bundles closer to budget if budget is set
      if (context.budget) {
        const aDiff = Math.abs(a.totalPrice.oneTime - context.budget)
        const bDiff = Math.abs(b.totalPrice.oneTime - context.budget)
        return aDiff - bDiff
      }
      return (b.savingsAmount || 0) - (a.savingsAmount || 0)
    })

    // Return top 2-3 bundles
    return bundles.slice(0, Math.min(3, bundles.length))
  }

  async searchProducts(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const allProducts: Product[] = [
      ...this.laptopBundles.flatMap(b => b.products),
      ...this.gamingBundles.flatMap(b => b.products),
      ...this.tvBundles.flatMap(b => b.products)
    ]

    // Simple search by name or category
    const lowerQuery = query.toLowerCase()
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.brand?.toLowerCase().includes(lowerQuery)
    )
  }

  async getProductDetails(sku: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const allProducts: Product[] = [
      ...this.laptopBundles.flatMap(b => b.products),
      ...this.gamingBundles.flatMap(b => b.products),
      ...this.tvBundles.flatMap(b => b.products)
    ]

    return allProducts.find(p => p.sku === sku) || null
  }
}

export default new MockDataService()