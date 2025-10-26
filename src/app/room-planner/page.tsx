export default function RoomPlannerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">📐🎨</div>
          <h1 className="text-5xl font-bold mb-4">
            Design Your Perfect Space
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto">
            Visualize your home theater, office, or smart home setup in AR before you buy. 
            Get expert recommendations for the perfect layout.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-bestbuy-dark mb-4">
              Plan with Confidence
            </h2>
            <p className="text-gray-600 mb-6">
              Use your phone or Apple Vision Pro to place TVs, speakers, furniture, 
              and smart devices in your actual space. See exactly how everything fits 
              before making a purchase.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <span>True-to-scale AR visualization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <span>Automatic measurements and clearances</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <span>Expert recommendations for optimal layout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <span>One-tap booking for Geek Squad installation</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-12 text-center">
            <div className="text-8xl mb-4">🏠</div>
            <p className="text-gray-700 font-semibold">
              AR Room Planner coming soon
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Available on iPhone, iPad, and Apple Vision Pro
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-3">🎭</div>
            <h3 className="text-xl font-bold text-bestbuy-dark mb-2">
              Home Theater
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Perfect TV size, soundbar placement, and seating distance
            </p>
            <button className="text-bestbuy-blue font-semibold hover:underline">
              Plan Theater →
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-3">💼</div>
            <h3 className="text-xl font-bold text-bestbuy-dark mb-2">
              Home Office
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Desk setup, monitor positioning, and lighting optimization
            </p>
            <button className="text-bestbuy-blue font-semibold hover:underline">
              Plan Office →
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-3">🏠</div>
            <h3 className="text-xl font-bold text-bestbuy-dark mb-2">
              Smart Home
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Security cameras, sensors, and smart device coverage
            </p>
            <button className="text-bestbuy-blue font-semibold hover:underline">
              Plan Smart Home →
            </button>
          </div>
        </div>

        <div className="mt-16 bg-bestbuy-blue rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need Help Planning Your Space?
          </h2>
          <p className="mb-6">
            Talk to My Tech Pro for personalized recommendations and expert layout advice
          </p>
          <button className="bg-bestbuy-yellow text-bestbuy-dark px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors">
            Get Expert Help
          </button>
        </div>
      </div>
    </div>
  )
}
