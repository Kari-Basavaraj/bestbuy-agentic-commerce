import { SolutionBundle } from '@/types/agent'

export const mockBundles: SolutionBundle[] = [
  {
    id: 'creator-pro-1',
    name: 'Pro Creator Video Setup',
    description: 'Professional video editing workstation with color-accurate monitor and fast storage',
    products: [
      {
        id: 'laptop-1',
        sku: 'MBP14-M3PRO',
        name: 'MacBook Pro 14" M3 Pro',
        price: 1999,
        image: '/laptop.jpg',
        category: 'Laptop',
        inStock: true
      },
      {
        id: 'monitor-1',
        sku: 'LG27UL850',
        name: 'LG 27" 4K UltraFine Monitor',
        price: 599,
        image: '/monitor.jpg',
        category: 'Display',
        inStock: true
      }
    ],
    services: [
      {
        id: 'data-transfer-1',
        type: 'data-transfer',
        name: 'Data Migration Service',
        price: 99,
        description: 'Transfer files from old device to new setup'
      },
      {
        id: 'protection-1',
        type: 'protection',
        name: 'AppleCare+ Protection',
        price: 279,
        description: '3 years of hardware coverage and support'
      }
    ],
    totalPrice: {
      oneTime: 2976,
      monthly: 0
    },
    fulfillment: [
      {
        type: 'pickup',
        available: true,
        timing: 'Available today',
        location: 'Best Buy Store #123'
      },
      {
        type: 'installation',
        available: true,
        timing: 'Tomorrow 2-4pm',
        price: 49
      }
    ],
    membershipSavings: 150,
    whyThisPick: 'Perfect balance of performance and portability for serious content creation'
  },
  {
    id: 'home-theater-1',
    name: 'Premium Home Theater System',
    description: 'Complete 4K entertainment setup with immersive surround sound',
    products: [
      {
        id: 'tv-1',
        sku: 'SONY65X90L',
        name: 'Sony 65" 4K LED TV',
        price: 1299,
        image: '/tv.jpg',
        category: 'Television',
        inStock: true
      },
      {
        id: 'soundbar-1',
        sku: 'SAMSUNG-Q800B',
        name: 'Samsung Q800B 5.1.2 Soundbar',
        price: 899,
        image: '/soundbar.jpg',
        category: 'Audio',
        inStock: true
      }
    ],
    services: [
      {
        id: 'installation-1',
        type: 'installation',
        name: 'Home Theater Installation',
        price: 299,
        description: 'Professional TV mounting and sound system setup'
      },
      {
        id: 'protection-2',
        type: 'protection',
        name: 'Geek Squad Protection',
        price: 199,
        description: '5 years comprehensive coverage'
      }
    ],
    totalPrice: {
      oneTime: 2696,
      monthly: 0
    },
    fulfillment: [
      {
        type: 'delivery',
        available: true,
        timing: 'Tomorrow 6-8pm',
        price: 0
      },
      {
        type: 'installation',
        available: true,
        timing: 'Thursday 10am-12pm',
        price: 299
      }
    ],
    membershipSavings: 200,
    whyThisPick: 'Cinematic experience with professional installation for optimal viewing'
  },
  {
    id: 'gaming-1',
    name: 'Elite Gaming Battlestation',
    description: 'High-performance gaming rig with peripherals and RGB setup',
    products: [
      {
        id: 'gaming-pc-1',
        sku: 'ALIENWARE-R16',
        name: 'Alienware Aurora R16 Gaming PC',
        price: 2499,
        image: '/gaming-pc.jpg',
        category: 'Desktop',
        inStock: true
      },
      {
        id: 'monitor-2',
        sku: 'ASUSPG279QM',
        name: 'ASUS ROG 27" 240Hz Gaming Monitor',
        price: 799,
        image: '/gaming-monitor.jpg',
        category: 'Display',
        inStock: true
      },
      {
        id: 'chair-1',
        sku: 'HEROCHAIR-PRO',
        name: 'Hero Gaming Chair Pro',
        price: 399,
        image: '/gaming-chair.jpg',
        category: 'Furniture',
        inStock: true
      }
    ],
    services: [
      {
        id: 'setup-1',
        type: 'installation',
        name: 'Gaming Setup Optimization',
        price: 149,
        description: 'Optimize settings and configure RGB lighting'
      },
      {
        id: 'protection-3',
        type: 'protection',
        name: 'Accidental Damage Protection',
        price: 399,
        description: '3 years coverage with overclocking protection'
      }
    ],
    totalPrice: {
      oneTime: 4245,
      monthly: 0
    },
    fulfillment: [
      {
        type: 'delivery',
        available: true,
        timing: 'Today 4-6pm',
        price: 0
      },
      {
        type: 'installation',
        available: true,
        timing: 'Tomorrow 1-3pm',
        price: 149
      }
    ],
    membershipSavings: 300,
    whyThisPick: 'Competitive-ready setup with professional optimization for peak performance'
  },
  {
    id: 'smarthome-1',
    name: 'Smart Home Starter Kit',
    description: 'Complete home automation with voice control and security monitoring',
    products: [
      {
        id: 'hub-1',
        sku: 'AMAZON-ECHO-4',
        name: 'Amazon Echo (4th Gen)',
        price: 149,
        image: '/echo.jpg',
        category: 'Smart Speaker',
        inStock: true
      },
      {
        id: 'lights-1',
        sku: 'PHILIPS-HUE-KIT',
        name: 'Philips Hue Smart Lighting Kit',
        price: 199,
        image: '/hue.jpg',
        category: 'Lighting',
        inStock: true
      },
      {
        id: 'thermostat-1',
        sku: 'NEST-LEARNING',
        name: 'Google Nest Learning Thermostat',
        price: 249,
        image: '/nest.jpg',
        category: 'Climate',
        inStock: true
      }
    ],
    services: [
      {
        id: 'installation-2',
        type: 'installation',
        name: 'Smart Home Setup',
        price: 199,
        description: 'Configure all devices and create automation routines'
      },
      {
        id: 'support-1',
        type: 'support',
        name: '24/7 Tech Support',
        price: 0,
        description: 'Ongoing support for smart home devices'
      }
    ],
    totalPrice: {
      oneTime: 796,
      monthly: 0
    },
    fulfillment: [
      {
        type: 'delivery',
        available: true,
        timing: 'Tomorrow 10am-12pm',
        price: 0
      },
      {
        type: 'installation',
        available: true,
        timing: 'Thursday 2-4pm',
        price: 199
      }
    ],
    membershipSavings: 75,
    whyThisPick: 'Easy-to-use smart home solution with professional configuration'
  }
]