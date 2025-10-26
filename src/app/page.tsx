import AgentHero from '@/components/agent/AgentHero'
import ProductCategories from '@/components/commerce/ProductCategories'

export default function Home() {
  return (
    <div className="flex flex-col">
      <AgentHero />
      <ProductCategories />
    </div>
  )
}
