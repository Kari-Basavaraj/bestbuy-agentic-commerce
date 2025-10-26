'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAgent } from '@/contexts/AgentContext'

export default function ProductsPage() {
  const { openAgent } = useAgent()

  const productCategories = [
    {
      title: "Computing",
      description: "Laptops, desktops, tablets and accessories",
      products: ["Laptops", "Desktops", "Tablets", "Monitors", "Keyboards & Mice"],
      icon: "💻"
    },
    {
      title: "Gaming",
      description: "Gaming consoles, PCs and accessories",
      products: ["Gaming Laptops", "Gaming Desktops", "Consoles", "Gaming Chairs", "Headsets"],
      icon: "🎮"
    },
    {
      title: "TV & Home Theater",
      description: "Smart TVs, sound systems and streaming",
      products: ["Smart TVs", "Sound Bars", "Streaming Devices", "Home Theater Systems"],
      icon: "📺"
    },
    {
      title: "Mobile",
      description: "Smartphones and accessories",
      products: ["iPhones", "Android Phones", "Cases", "Chargers", "Screen Protectors"],
      icon: "📱"
    },
    {
      title: "Smart Home",
      description: "Connected home devices and automation",
      products: ["Smart Speakers", "Security Cameras", "Thermostats", "Lighting", "Door Locks"],
      icon: "🏠"
    },
    {
      title: "Appliances",
      description: "Kitchen and home appliances",
      products: ["Refrigerators", "Washers & Dryers", "Dishwashers", "Microwaves", "Coffee Makers"],
      icon: "🔌"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-bestbuy-blue to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Our Products
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover our complete range of tech products and solutions. From personal computing
            to smart home automation, we have everything you need.
          </p>
          <Button
            onClick={openAgent}
            className="mt-8 bg-bestbuy-yellow text-bestbuy-dark hover:bg-yellow-300"
            size="lg"
          >
            Get Personalized Recommendations
          </Button>
        </div>
      </div>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-bestbuy-dark mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of products across all major categories.
            Not sure what you need? Ask My Tech Pro for personalized recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{category.icon}</div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-bestbuy-dark">Popular Products:</h4>
                  <div className="flex flex-wrap gap-1">
                    {category.products.map((product, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-bestbuy-blue text-bestbuy-blue hover:bg-bestbuy-blue hover:text-white"
                  onClick={openAgent}
                >
                  Ask About {category.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-bestbuy-dark mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our AI-powered Tech Pro can help you find the perfect products based on your needs,
            budget, and preferences. Get personalized recommendations in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openAgent}
              className="bg-bestbuy-blue text-white hover:bg-blue-700"
              size="lg"
            >
              Talk to My Tech Pro
            </Button>
            <Button
              variant="outline"
              className="border-bestbuy-blue text-bestbuy-blue hover:bg-bestbuy-blue hover:text-white"
              size="lg"
            >
              Browse All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
