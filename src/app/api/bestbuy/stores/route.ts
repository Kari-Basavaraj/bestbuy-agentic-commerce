import { NextRequest, NextResponse } from 'next/server'
import bestBuyService from '@/services/bestbuy.service'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const location = searchParams.get('location')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = parseInt(searchParams.get('radius') || '25')

    let stores

    if (lat && lng) {
      // Search by coordinates
      stores = await bestBuyService.findStores(
        { lat: parseFloat(lat), lng: parseFloat(lng) },
        radius
      )
    } else if (location) {
      // Search by location string (city, state, zip)
      stores = await bestBuyService.findStores(location, radius)
    } else {
      return NextResponse.json(
        { error: 'Either location or lat/lng is required' },
        { status: 400 }
      )
    }

    return NextResponse.json({ stores })
  } catch (error) {
    console.error('Store search error:', error)
    return NextResponse.json(
      { error: 'Failed to find stores' },
      { status: 500 }
    )
  }
}
