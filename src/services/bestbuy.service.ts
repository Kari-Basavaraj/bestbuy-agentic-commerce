import { Product } from '@/types/agent'

interface BestBuyProduct {
  sku: string
  name: string
  salePrice: number
  image: string
  categoryPath: { name: string }[]
  inStoreAvailability: boolean
  onlineAvailability: boolean
  url: string
  manufacturer: string
  modelNumber: string
  customerReviewAverage?: number
  customerReviewCount?: number
}

interface StoreInfo {
  storeId: string
  name: string
  address: string
  city: string
  region: string
  postalCode: string
  distance: number
  phone: string
}

export class BestBuyService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.BESTBUY_API_KEY || ''
    this.baseUrl = process.env.BESTBUY_API_BASE_URL || 'https://api.bestbuy.com/v1'
  }

  /**
   * Search for products by query
   */
  async searchProducts(
    query: string,
    options: {
      maxPrice?: number
      category?: string
      inStock?: boolean
      page?: number
      pageSize?: number
    } = {}
  ): Promise<Product[]> {
    try {
      if (!this.apiKey) {
        console.warn('Best Buy API key not configured, using mock data')
        return this.getMockProducts(query, options.maxPrice)
      }

      const { maxPrice, category, inStock = true, page = 1, pageSize = 10 } = options

      // Build search query
      let searchQuery = `search=${encodeURIComponent(query)}`
      
      if (maxPrice) {
        searchQuery += `&salePrice<=${maxPrice}`
      }
      
      if (category) {
        searchQuery += `&categoryPath.name=${encodeURIComponent(category)}`
      }
      
      if (inStock) {
        searchQuery += '&inStoreAvailability=true'
      }

      const response = await fetch(
        `${this.baseUrl}/products(${searchQuery})?apiKey=${this.apiKey}&format=json&show=sku,name,salePrice,image,categoryPath.name,inStoreAvailability,onlineAvailability&pageSize=${pageSize}&page=${page}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
      )

      if (!response.ok) {
        throw new Error('Best Buy API request failed')
      }

      const data = await response.json()
      return this.transformProducts(data.products || [])
    } catch (error) {
      console.error('Best Buy API error:', error)
      return this.getMockProducts(query, options.maxPrice)
    }
  }

  /**
   * Get product by SKU
   */
  async getProduct(sku: string): Promise<Product | null> {
    try {
      if (!this.apiKey) {
        return null
      }

      const response = await fetch(
        `${this.baseUrl}/products/${sku}.json?apiKey=${this.apiKey}`,
        { next: { revalidate: 3600 } }
      )

      if (!response.ok) {
        return null
      }

      const product = await response.json()
      return this.transformProduct(product)
    } catch (error) {
      console.error('Best Buy API error:', error)
      return null
    }
  }

  /**
   * Find stores near location
   */
  async findStores(
    location: { lat: number; lng: number } | string,
    radius: number = 25
  ): Promise<StoreInfo[]> {
    try {
      if (!this.apiKey) {
        return this.getMockStores()
      }

      let searchQuery = ''
      if (typeof location === 'string') {
        searchQuery = `region=${encodeURIComponent(location)}`
      } else {
        searchQuery = `area(${location.lat},${location.lng},${radius})`
      }

      const response = await fetch(
        `${this.baseUrl}/stores(${searchQuery})?apiKey=${this.apiKey}&format=json&pageSize=10`,
        { next: { revalidate: 86400 } } // Cache for 24 hours
      )

      if (!response.ok) {
        throw new Error('Best Buy stores API request failed')
      }

      const data = await response.json()
      return data.stores || []
    } catch (error) {
      console.error('Best Buy stores API error:', error)
      return this.getMockStores()
    }
  }

  /**
   * Check product availability at store
   */
  async checkStoreAvailability(sku: string, storeId: string): Promise<boolean> {
    try {
      if (!this.apiKey) {
        return true // Mock as available
      }

      const response = await fetch(
        `${this.baseUrl}/stores/${storeId}/products/${sku}.json?apiKey=${this.apiKey}`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
      )

      if (!response.ok) {
        return false
      }

      const data = await response.json()
      return data.inStoreAvailability === true
    } catch (error) {
      console.error('Best Buy availability API error:', error)
      return false
    }
  }

  // Transform Best Buy API product to our Product type
  private transformProduct(bbProduct: BestBuyProduct): Product {
    return {
      id: bbProduct.sku,
      sku: bbProduct.sku,
      name: bbProduct.name,
      price: bbProduct.salePrice,
      image: bbProduct.image || '/placeholder-product.jpg',
      category: bbProduct.categoryPath?.[0]?.name || 'Electronics',
      inStock: bbProduct.inStoreAvailability || bbProduct.onlineAvailability,
    }
  }

  private transformProducts(bbProducts: BestBuyProduct[]): Product[] {
    return bbProducts.map(p => this.transformProduct(p))
  }

  // Mock data for development/fallback
  private getMockProducts(query: string, maxPrice?: number): Product[] {
    const mockProducts: Product[] = [
      {
        id: 'mock-mbp-1',
        sku: 'MBP16-M3-MAX',
        name: 'MacBook Pro 16" M3 Max',
        price: 3499,
        image: '/placeholder-laptop.jpg',
        category: 'Laptops',
        inStock: true,
      },
      {
        id: 'mock-mba-1',
        sku: 'MBA-M2-15',
        name: 'MacBook Air 15" M2',
        price: 1299,
        image: '/placeholder-laptop.jpg',
        category: 'Laptops',
        inStock: true,
      },
      {
        id: 'mock-tv-1',
        sku: 'SONY-75-X90L',
        name: 'Sony 75" 4K Smart TV X90L',
        price: 1799,
        image: '/placeholder-tv.jpg',
        category: 'TVs',
        inStock: true,
      },
      {
        id: 'mock-soundbar-1',
        sku: 'SONOS-ARC',
        name: 'Sonos Arc Soundbar',
        price: 899,
        image: '/placeholder-soundbar.jpg',
        category: 'Audio',
        inStock: true,
      },
    ]

    let filtered = mockProducts
    
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= maxPrice)
    }

    return filtered
  }

  private getMockStores(): StoreInfo[] {
    return [
      {
        storeId: '1',
        name: 'Best Buy Union Square',
        address: '529 5th Ave',
        city: 'New York',
        region: 'NY',
        postalCode: '10017',
        distance: 0.5,
        phone: '(212) 555-0100',
      },
      {
        storeId: '2',
        name: 'Best Buy Chelsea',
        address: '60 W 23rd St',
        city: 'New York',
        region: 'NY',
        postalCode: '10010',
        distance: 1.2,
        phone: '(212) 555-0200',
      },
    ]
  }
}

export default new BestBuyService()
