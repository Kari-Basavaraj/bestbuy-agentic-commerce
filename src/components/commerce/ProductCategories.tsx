'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, Tv, Gamepad2, Home, Shield, Briefcase, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAgent } from '@/contexts/AgentContext'

interface Category {
  id: number
  name: string
  description: string
  Icon: LucideIcon
  color: string
  query: string
}

export default function ProductCategories() {
  const { openAgentWithMessage } = useAgent()

  const categories: Category[] = [
    {
      id: 1,
      name: 'Creator Setups',
      description: 'Complete video editing and content creation bundles',
      Icon: Video,
      color: 'text-purple-600',
      query: 'I need a complete video editing and content creation setup'
    },
    {
      id: 2,
      name: 'Home Theater',
      description: 'Immersive entertainment with installation',
      Icon: Tv,
      color: 'text-blue-600',
      query: 'I want to set up a home theater system with installation'
    },
    {
      id: 3,
      name: 'Gaming Rigs',
      description: 'Pro gaming setups with Geek Squad setup',
      Icon: Gamepad2,
      color: 'text-red-600',
      query: 'I need a gaming setup with Geek Squad installation'
    },
    {
      id: 4,
      name: 'Smart Home',
      description: 'Connected home solutions with professional install',
      Icon: Home,
      color: 'text-green-600',
      query: 'I want to set up smart home devices with professional installation'
    },
    {
      id: 5,
      name: 'Aging at Home',
      description: 'Safety and monitoring for independent living',
      Icon: Shield,
      color: 'text-indigo-600',
      query: 'I need safety and monitoring solutions for aging at home'
    },
    {
      id: 6,
      name: 'Work From Home',
      description: 'Complete office setups for remote work',
      Icon: Briefcase,
      color: 'text-amber-600',
      query: 'I need a complete work from home office setup'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-bestbuy-dark mb-4">
            Explore Solution Bundles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete setups curated by experts, not overwhelming product lists. 
            Each bundle includes everything you need to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const { Icon } = category
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer transition-all hover:shadow-lg hover:border-bestbuy-blue/50"
              >
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Icon className={`w-6 h-6 ${category.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div>
                    <CardTitle className="group-hover:text-bestbuy-blue transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {category.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full group/btn"
                    onClick={() => openAgentWithMessage(category.query)}
                  >
                    <span>Explore Bundle</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
