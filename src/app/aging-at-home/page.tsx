'use client'

export default function AgingAtHomePage() {
  const safetyBundles = [
    {
      id: 1,
      name: 'Essential Safety Pack',
      price: 599,
      monthlyMonitoring: 29.99,
      features: [
        'Fall detection sensor',
        'Emergency call button',
        'Motion activity alerts',
        'Caregiver mobile app',
        'Professional installation',
        '24/7 monitoring available'
      ],
      ideal: 'Mobile seniors living alone'
    },
    {
      id: 2,
      name: 'Complete Care Bundle',
      price: 1299,
      monthlyMonitoring: 49.99,
      features: [
        'Everything in Essential Pack',
        'Smart door/window sensors',
        'Medication reminder system',
        'Video check-in camera',
        'Temperature monitoring',
        'Power outage alerts',
        'Wellness dashboard for family'
      ],
      ideal: 'Seniors with health conditions',
      popular: true
    },
    {
      id: 3,
      name: 'Premium Support System',
      price: 2499,
      monthlyMonitoring: 79.99,
      features: [
        'Everything in Complete Care',
        'Smart health vitals monitor',
        'Voice-activated assistant',
        'Automated lighting controls',
        'Smart thermostat',
        'Emergency medical history access',
        'Weekly wellness check calls'
      ],
      ideal: 'Comprehensive aging-in-place solution'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🏠💜</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Aging at Home, Safely
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
              Help your loved ones live independently with confidence. 
              Complete safety monitoring and support systems installed by experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-bestbuy-yellow text-bestbuy-dark px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors">
                Talk to Safety Expert
              </button>
              <button className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Home Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-bestbuy-dark mb-4">
              Peace of Mind for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay connected to aging parents without being intrusive. 
              They maintain independence, you get instant alerts when it matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚨</div>
              <h3 className="text-xl font-bold text-bestbuy-dark mb-2">
                Instant Fall Detection
              </h3>
              <p className="text-gray-600">
                Automatic alerts to family and emergency services if a fall is detected
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-bestbuy-dark mb-2">
                Caregiver Dashboard
              </h3>
              <p className="text-gray-600">
                Monitor activity patterns and get alerts from anywhere via mobile app
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-bestbuy-dark mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600">
                Your loved one controls who sees what. No intrusive video monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Bundles */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-bestbuy-dark mb-4">
              Complete Safety Packages
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need, professionally installed and monitored
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {safetyBundles.map((bundle) => (
              <div
                key={bundle.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  bundle.popular ? 'ring-4 ring-purple-500' : ''
                }`}
              >
                {bundle.popular && (
                  <div className="bg-purple-600 text-white text-center py-2 font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-bestbuy-dark mb-2">
                    {bundle.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 italic">
                    {bundle.ideal}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-bestbuy-blue">
                        ${bundle.price}
                      </span>
                      <span className="text-gray-600">one-time</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      + ${bundle.monthlyMonitoring}/mo monitoring (optional)
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {bundle.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-bestbuy-blue text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                    Get This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-bestbuy-dark mb-4">
              Simple Setup, Ongoing Support
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-700">1</span>
              </div>
              <h3 className="font-bold text-bestbuy-dark mb-2">Consultation</h3>
              <p className="text-sm text-gray-600">
                Talk to our safety expert about your loved one's needs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-700">2</span>
              </div>
              <h3 className="font-bold text-bestbuy-dark mb-2">Home Visit</h3>
              <p className="text-sm text-gray-600">
                Geek Squad assesses layout and recommends placement
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-700">3</span>
              </div>
              <h3 className="font-bold text-bestbuy-dark mb-2">Installation</h3>
              <p className="text-sm text-gray-600">
                Professional setup and testing of all devices
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-700">4</span>
              </div>
              <h3 className="font-bold text-bestbuy-dark mb-2">Ongoing Care</h3>
              <p className="text-sm text-gray-600">
                24/7 monitoring and family support included
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Help Your Loved One Stay Home Safely?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Talk to a specialist who understands both the technology and the emotions
          </p>
          <button className="bg-bestbuy-yellow text-bestbuy-dark px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors">
            Schedule Free Consultation
          </button>
          <p className="text-sm text-purple-200 mt-4">
            No obligation. Just a conversation about what's possible.
          </p>
        </div>
      </div>
    </div>
  )
}
