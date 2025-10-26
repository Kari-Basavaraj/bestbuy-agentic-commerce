import { NextRequest, NextResponse } from 'next/server'
import bestBuyService from '@/services/bestbuy.service'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const maxPrice = searchParams.get('maxPrice')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    const products = await bestBuyService.searchProducts(query, {
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      category: category || undefined,
      page,
      pageSize: 20,
    })

    return NextResponse.json({ products, query })
  } catch (error) {
    console.error('Product search error:', error)
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}
